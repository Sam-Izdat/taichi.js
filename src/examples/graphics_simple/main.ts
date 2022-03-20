//@ts-nocheck 



let simpleGraphicsExample = async (htmlCanvas:HTMLCanvasElement) => {
    await ti.init()
    let Vertex = ti.types.struct({
        pos: ti.types.vector(ti.f32, 3)
    })
    
    let VBO = ti.field(Vertex, 100)
    let target = ti.texture(ti.f32, 4, [1024,1024])
    let SSBO = ti.field(ti.f32, 100)
    
    ti.addToKernelScope({VBO, target, SSBO})
    
    let pipeline = ti.kernel(
        () => {
            for(let i of range(100)){
                SSBO[i] = i
            }
            for(let v of ti.input_vertices(VBO)){
                v.pos = v.pos + SSBO[0]
                ti.output_vertex(v)
            }
            for(let f of ti.input_fragments()){
                ti.output_fragment(target, f.pos.xyzx + SSBO[1])
            }
        }
    )
     
}

export {simpleGraphicsExample}