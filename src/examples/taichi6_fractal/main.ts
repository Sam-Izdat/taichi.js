//@ts-nocheck
import {ti} from "../../taichi" 
import {Program} from '../../program/Program'

async function taichiExample6Fractal(canvas:HTMLCanvasElement): Promise<boolean> {
    console.log("taichiExample6Fractal")
     
    await ti.init() 

    let n = 320

    let pixels = ti.Vector.field(4, ti.f32,[2*n, n])
    let t = ti.field(ti.f32,[1])
    ti.addToKernelScope({pixels, n, t}) 

    let kernel = ti.kernel(
        function k() {
            //@ts-ignore
            for(let I of ndrange(n*2,n)){
                let i = I[0]
                let j = I[1]
                let c = [-0.8, cos(t[0]) * 0.2]
                let z = [i / n - 1, j / n - 0.5] * 2
                let iterations = 0
                while( sqrt(z[0]*z[0]+z[1]*z[1]) < 20 && iterations < 50 ){
                    z = [z[0]**2 - z[1]**2, z[1] * z[0] * 2] + c
                    iterations = iterations + 1
                }
                pixels[i,j] = 1 - iterations * 0.02
                pixels[i,j][3] = 1
            }
            t[0] = t[0] + 0.03
        }
    )

    let program = Program.getCurrentProgram()
    let renderer = await program.runtime!.getRootBufferRenderer(canvas,pixels.snodeTree.treeId)
 
    async function frame() {
        kernel()
        //console.log("done")
        await program.runtime!.sync()
        await renderer.render(2*n, n)
        requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
}

export {taichiExample6Fractal}