const ToneMaps =
{
    linear: "Linear" ,
    uncharted: "Uncharted 2" ,
    hejlRichard: "Hejl Richard"
};

const DebugOutput =
{
    none: "None",
    metallic: "Metallic",
    roughness: "Roughness",
    normal: "Normal",
    baseColor: "Base Color",
    occlusion: "Occlusion",
    emisive: "Emissive",
    alpha: "Alpha",
    f0: "F0"
};

class gltfRenderingParameters
{
    constructor(useIBL = true,
        usePunctual = false,
        useHdr = true,
        exposure = 1.0,
        gamma = 2.2,
        clearColor = [51, 51, 51],
        toneMap = ToneMaps.linear,
        debugOutput = DebugOutput.none)
    {
        this.useIBL = useIBL;
        this.usePunctual = usePunctual;
        this.useHdr = useHdr;
        this.exposure = exposure;
        this.gamma = gamma;
        this.clearColor = clearColor;
        this.toneMap = toneMap;
        this.debugOutput = debugOutput;
    }
};