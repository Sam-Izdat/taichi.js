import { Field } from "../../data/Field";
import { TextureBase } from "../../data/Texture";
import { PrimitiveType } from "../frontend/Type";
import { AllocaStmt, Block, FragmentForStmt, GlobalPtrStmt, GlobalTemporaryStmt, IfStmt, IRModule, RangeForStmt, Stmt, VertexForStmt, WhileStmt } from "./Stmt";
export declare class IRBuilder {
    constructor();
    module: IRModule;
    guards: Guard[];
    get_int32(val: number): Stmt;
    get_float32(val: number): Stmt;
    create_range_for(range: Stmt, shouldStrictlySerialize: boolean): Stmt;
    get_loop_index(loop: Stmt): Stmt;
    create_global_ptr(field: Field, indices: Stmt[], elementOffset: number): Stmt;
    create_global_load(ptr: GlobalPtrStmt): Stmt;
    create_global_store(ptr: GlobalPtrStmt, val: Stmt): Stmt;
    create_global_temporary(type: PrimitiveType, offset: number): Stmt;
    create_global_temporary_load(ptr: GlobalTemporaryStmt): Stmt;
    create_global_temporary_store(ptr: GlobalTemporaryStmt, val: Stmt): Stmt;
    create_local_var(type: PrimitiveType): Stmt;
    create_local_load(ptr: AllocaStmt): Stmt;
    create_local_store(ptr: AllocaStmt, val: Stmt): Stmt;
    create_mul(lhs: Stmt, rhs: Stmt): Stmt;
    create_add(lhs: Stmt, rhs: Stmt): Stmt;
    create_sub(lhs: Stmt, rhs: Stmt): Stmt;
    create_truediv(lhs: Stmt, rhs: Stmt): Stmt;
    create_floordiv(lhs: Stmt, rhs: Stmt): Stmt;
    create_div(lhs: Stmt, rhs: Stmt): Stmt;
    create_mod(lhs: Stmt, rhs: Stmt): Stmt;
    create_max(lhs: Stmt, rhs: Stmt): Stmt;
    create_min(lhs: Stmt, rhs: Stmt): Stmt;
    create_bit_and(lhs: Stmt, rhs: Stmt): Stmt;
    create_bit_or(lhs: Stmt, rhs: Stmt): Stmt;
    create_bit_xor(lhs: Stmt, rhs: Stmt): Stmt;
    create_bit_shl(lhs: Stmt, rhs: Stmt): Stmt;
    create_bit_shr(lhs: Stmt, rhs: Stmt): Stmt;
    create_bit_sar(lhs: Stmt, rhs: Stmt): Stmt;
    create_cmp_lt(lhs: Stmt, rhs: Stmt): Stmt;
    create_cmp_le(lhs: Stmt, rhs: Stmt): Stmt;
    create_cmp_gt(lhs: Stmt, rhs: Stmt): Stmt;
    create_cmp_ge(lhs: Stmt, rhs: Stmt): Stmt;
    create_cmp_eq(lhs: Stmt, rhs: Stmt): Stmt;
    create_cmp_ne(lhs: Stmt, rhs: Stmt): Stmt;
    create_atan2(lhs: Stmt, rhs: Stmt): Stmt;
    create_pow(lhs: Stmt, rhs: Stmt): Stmt;
    create_logical_or(lhs: Stmt, rhs: Stmt): Stmt;
    create_logical_and(lhs: Stmt, rhs: Stmt): Stmt;
    create_neg(operand: Stmt): Stmt;
    create_sqrt(operand: Stmt): Stmt;
    create_round(operand: Stmt): Stmt;
    create_floor(operand: Stmt): Stmt;
    create_ceil(operand: Stmt): Stmt;
    create_cast_i32_value(operand: Stmt): Stmt;
    create_cast_f32_value(operand: Stmt): Stmt;
    create_cast_i32_bits(operand: Stmt): Stmt;
    create_cast_f32_bits(operand: Stmt): Stmt;
    create_abs(operand: Stmt): Stmt;
    create_sgn(operand: Stmt): Stmt;
    create_sin(operand: Stmt): Stmt;
    create_asin(operand: Stmt): Stmt;
    create_cos(operand: Stmt): Stmt;
    create_acos(operand: Stmt): Stmt;
    create_tan(operand: Stmt): Stmt;
    create_tanh(operand: Stmt): Stmt;
    create_inv(operand: Stmt): Stmt;
    create_rcp(operand: Stmt): Stmt;
    create_exp(operand: Stmt): Stmt;
    create_log(operand: Stmt): Stmt;
    create_rsqrt(operand: Stmt): Stmt;
    create_bit_not(operand: Stmt): Stmt;
    create_logic_not(operand: Stmt): Stmt;
    create_atomic_add(dest: Stmt, val: Stmt): Stmt;
    create_atomic_sub(dest: Stmt, val: Stmt): Stmt;
    create_atomic_max(dest: Stmt, val: Stmt): Stmt;
    create_atomic_min(dest: Stmt, val: Stmt): Stmt;
    create_while_true(): Stmt;
    create_if(cond: Stmt): Stmt;
    create_break(): Stmt;
    create_continue(): Stmt;
    create_argload(type: PrimitiveType, argId: number): Stmt;
    create_rand(type: PrimitiveType): Stmt;
    create_return(val: Stmt): Stmt;
    create_return_vec(vals: Stmt[]): Stmt;
    create_vertex_input(type: PrimitiveType, location: number): Stmt;
    create_vertex_output(val: Stmt, location: number): Stmt;
    create_position_output(vals: Stmt[]): Stmt;
    create_fragment_input(type: PrimitiveType, location: number): Stmt;
    create_color_output(location: number, vals: Stmt[]): Stmt;
    create_vertex_for(): Stmt;
    create_fragment_for(): Stmt;
    create_discard(): Stmt;
    create_depth_output(val: Stmt): Stmt;
    create_texture_sample(texture: TextureBase, coords: Stmt[]): Stmt;
    create_texture_sample_lod(texture: TextureBase, coords: Stmt[], lod: Stmt): Stmt;
    create_texture_load(texture: TextureBase, coords: Stmt[]): Stmt;
    create_texture_store(texture: TextureBase, coords: Stmt[], vals: Stmt[]): Stmt;
    create_composite_extract(composite: Stmt, index: number): Stmt;
    create_vertex_index_input(): Stmt;
    create_instance_index_input(): Stmt;
    create_dpdx(val: Stmt): Stmt;
    create_dpdy(val: Stmt): Stmt;
    get_range_loop_guard(loop: RangeForStmt): Guard;
    get_while_loop_guard(loop: WhileStmt): Guard;
    get_vertex_loop_guard(loop: VertexForStmt): Guard;
    get_fragment_loop_guard(loop: FragmentForStmt): Guard;
    get_if_guard(stmt: IfStmt, branch: boolean): Guard;
    getNewId(): number;
    pushNewStmt(stmt: Stmt): Stmt;
    addGuard(block: Block): Guard;
}
export declare class Guard {
    parent: {
        guards: Guard[];
    };
    block: Block;
    constructor(parent: {
        guards: Guard[];
    }, block: Block);
    delete(): void;
}
