

export { init } from './api/Init'

export { addToKernelScope, clearKernelScope, kernel, func, i32, f32, sync, template, classKernel } from './api/Kernels'
export { field, Vector, Matrix, Struct, } from "./api/Fields"
export { texture, canvasTexture, depthTexture, Texture, CubeTexture, TextureSamplingOptions, WrapMode } from "./api/Textures"
export { Canvas } from "./api/ui/Canvas"
export { Timer } from "./utils/Timer"
export * from "./api/KernelScopeBuiltin"

import * as engine from "./engine/index"
export { engine }

import * as types from "./api/Types"
export { types }

export { runAllTests } from "./tests/All"

import * as ti from "./taichi"

declare module globalThis {
    let ti: any;
}
globalThis.ti = ti