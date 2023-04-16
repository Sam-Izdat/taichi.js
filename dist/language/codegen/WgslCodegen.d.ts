import { FragmentShaderParams, ResourceBinding, ResourceInfo, TaskParams, VertexShaderParams } from "../../runtime/Kernel";
import { Runtime } from "../../runtime/Runtime";
import { StringBuilder } from "../../utils/StringBuilder";
import { PrimitiveType } from "../frontend/Type";
import { AllocaStmt, ArgLoadStmt, AtomicLoadStmt, AtomicOpStmt, AtomicStoreStmt, BinaryOpStmt, BuiltInInputStmt, BuiltInOutputStmt, CompositeExtractStmt, ConstStmt, ContinueStmt, DiscardStmt, FragmentDerivativeStmt, FragmentForStmt, FragmentInputStmt, GlobalLoadStmt, GlobalPtrStmt, GlobalStoreStmt, GlobalTemporaryLoadStmt, GlobalTemporaryStmt, GlobalTemporaryStoreStmt, IfStmt, LocalLoadStmt, LocalStoreStmt, LoopIndexStmt, RandStmt, RangeForStmt, ReturnStmt, Stmt, TextureFunctionStmt, UnaryOpStmt, VertexForStmt, VertexInputStmt, VertexOutputStmt, WhileControlStmt, WhileStmt } from "../ir/Stmt";
import { IRVisitor } from "../ir/Visitor";
import { OffloadedModule } from "./Offload";
declare class ResourceBindingMap {
    bindings: ResourceBinding[];
    has(resource: ResourceInfo): boolean;
    add(resource: ResourceInfo, bindingPoint: number): void;
    get(resource: ResourceInfo): number | undefined;
    size(): number;
}
export declare class CodegenVisitor extends IRVisitor {
    runtime: Runtime;
    offload: OffloadedModule;
    argBytes: number;
    retBytes: number;
    previousStageBindings: ResourceBinding[];
    constructor(runtime: Runtime, offload: OffloadedModule, argBytes: number, retBytes: number, previousStageBindings: ResourceBinding[]);
    visitConstStmt(stmt: ConstStmt): void;
    visitRandStmt(stmt: RandStmt): void;
    visitUnaryOpStmt(stmt: UnaryOpStmt): void;
    visitBinaryOpStmt(stmt: BinaryOpStmt): void;
    visitRangeForStmt(stmt: RangeForStmt): void;
    visitIfStmt(stmt: IfStmt): void;
    visitWhileControlStmt(stmt: WhileControlStmt): void;
    visitContinueStmt(stmt: ContinueStmt): void;
    visitWhileStmt(stmt: WhileStmt): void;
    visitVertexInputStmt(stmt: VertexInputStmt): void;
    visitFragmentInputStmt(stmt: FragmentInputStmt): void;
    visitVertexOutputStmt(stmt: VertexOutputStmt): void;
    visitBuiltInOutputStmt(stmt: BuiltInOutputStmt): void;
    visitBuiltInInputStmt(stmt: BuiltInInputStmt): void;
    visitFragmentDerivativeStmt(stmt: FragmentDerivativeStmt): void;
    visitDiscardStmt(stmt: DiscardStmt): void;
    visitTextureFunctionStmt(stmt: TextureFunctionStmt): void;
    visitCompositeExtractStmt(stmt: CompositeExtractStmt): void;
    visitArgLoadStmt(stmt: ArgLoadStmt): void;
    visitReturnStmt(stmt: ReturnStmt): void;
    visitAllocaStmt(stmt: AllocaStmt): void;
    visitLocalLoadStmt(stmt: LocalLoadStmt): void;
    visitLocalStoreStmt(stmt: LocalStoreStmt): void;
    visitGlobalPtrStmt(stmt: GlobalPtrStmt): void;
    visitGlobalTemporaryStmt(stmt: GlobalTemporaryStmt): void;
    emitGlobalLoadExpr(stmt: GlobalLoadStmt | GlobalTemporaryLoadStmt): void;
    emitGlobalStore(stmt: GlobalStoreStmt | GlobalTemporaryStoreStmt): void;
    visitGlobalLoadStmt(stmt: GlobalLoadStmt): void;
    visitGlobalStoreStmt(stmt: GlobalStoreStmt): void;
    visitGlobalTemporaryLoadStmt(stmt: GlobalTemporaryLoadStmt): void;
    visitGlobalTemporaryStoreStmt(stmt: GlobalTemporaryStoreStmt): void;
    visitAtomicOpStmt(stmt: AtomicOpStmt): void;
    visitAtomicLoadStmt(stmt: AtomicLoadStmt): void;
    visitAtomicStoreStmt(stmt: AtomicStoreStmt): void;
    visitLoopIndexStmt(stmt: LoopIndexStmt): void;
    visitFragmentForStmt(stmt: FragmentForStmt): void;
    visitVertexForStmt(stmt: VertexForStmt): void;
    generateSerialKernel(): TaskParams;
    generateRangeForKernel(): TaskParams;
    generateVertexForKernel(): VertexShaderParams;
    generateFragmentForKernel(): FragmentShaderParams;
    generate(): TaskParams | VertexShaderParams | FragmentShaderParams;
    emitLet(name: string, type: string): void;
    emitVar(name: string, type: string): void;
    getPointerIntTypeName(): string;
    getPrimitiveTypeName(dt: PrimitiveType): "f32" | "i32" | "error";
    getScalarOrVectorTypeName(dt: PrimitiveType, numComponents: number): string;
    getScalarOrVectorExpr(values: Stmt[], typeName: string): string;
    globalDecls: StringBuilder;
    stageInStructBegin: StringBuilder;
    stageInStructBody: StringBuilder;
    stageInStructEnd: StringBuilder;
    stageOutStructBegin: StringBuilder;
    stageOutStructBody: StringBuilder;
    stageOutStructEnd: StringBuilder;
    funtionSignature: StringBuilder;
    functionBodyPrologue: StringBuilder;
    body: StringBuilder;
    functionBodyEpilogue: StringBuilder;
    functionEnd: StringBuilder;
    assembleShader(): string;
    startComputeFunction(blockSizeX: number): void;
    startGraphicsFunction(): void;
    ensureStageInStruct(): void;
    ensureStageOutStruct(): void;
    stageInMembers: Set<string>;
    addStageInMember(name: string, dt: string, loc: number, flat: boolean): void;
    stageOutMembers: Set<string>;
    addStageOutMember(name: string, dt: string, loc: number, flat: boolean): void;
    stageOutBuiltinMembers: Set<string>;
    addStageOutBuiltinMember(name: string, dt: string, builtin: string): void;
    bodyIndentCount: number;
    indent(): void;
    dedent(): void;
    getIndentation(): string;
    nextInternalTemp: number;
    getTemp(hint?: string): string;
    isVertexFor(): boolean;
    isFragmentFor(): boolean;
    getRawDataTypeName(): string;
    getRawDataTypeSize(): number;
    getElementCount(buffer: ResourceInfo): number;
    resourceBindings: ResourceBindingMap;
    getBufferName(buffer: ResourceInfo): string;
    isBufferWritable(buffer: ResourceInfo): boolean;
    assertBufferWritable(buffer: ResourceInfo): void;
    declareNewBuffer(buffer: ResourceInfo, name: string, binding: number, elementType: string, elementCount: number): void;
    getBufferMemberName(buffer: ResourceInfo): string;
    getTextureName(textureInfo: ResourceInfo): string;
    declareNewTexture(texture: ResourceInfo, name: string, typeName: string, templateArgs: string, binding: number): void;
    getSamplerName(samplerInfo: ResourceInfo): string;
    declareNewSampler(sampler: ResourceInfo, name: string, typeName: string, binding: number): void;
    randInitiated: boolean;
    initRand(): void;
}
export {};
