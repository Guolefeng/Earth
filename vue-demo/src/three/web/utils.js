import * as THREE from "three";
const handleTextureProp = (el, texture) => {
    const minFilterDefaultValue = el instanceof HTMLVideoElement ? "linear" : "mipmap";
    const magFilterDefaultValue = el instanceof HTMLVideoElement ? "linear" : "mipmap";
    const wrapS = el?.getAttribute("wrap-s") || "repeat";
    const wrapT = el?.getAttribute("wrap-t") || "repeat";
    const minFilter = el?.getAttribute("min-filter") || minFilterDefaultValue;
    const magFilter = el?.getAttribute("mag-filter") || magFilterDefaultValue;
    const wrapMap = {
        clamp: THREE.ClampToEdgeWrapping,
        repeat: THREE.RepeatWrapping,
        mirror: THREE.MirroredRepeatWrapping,
    };
    const filterMap = {
        nearest: THREE.NearestFilter,
        linear: THREE.LinearFilter,
        mipmap: THREE.LinearMipMapLinearFilter,
    };
    texture.wrapS = wrapMap[wrapS];
    texture.wrapT = wrapMap[wrapT];
    texture.minFilter = filterMap[minFilter];
    texture.magFilter = filterMap[magFilter];
    if (el instanceof HTMLVideoElement) {
        const start = el?.getAttribute("autoplay") || "";
        el?.addEventListener("loadedmetadata", () => {
            if (start) {
                texture.image.play();
            }
        });
    }
};
const loadTextureFromImg = (el) => {
    if (!el) {
        return null;
    }
    const texture = new THREE.TextureLoader().load(el.src);
    handleTextureProp(el, texture);
    return texture;
};
const loadCubemapFromImgs = (el, els) => {
    if (!el) {
        return null;
    }
    const texture = new THREE.CubeTextureLoader().load(els.map((item) => item.src));
    handleTextureProp(el, texture);
    return texture;
};
const loadTextureFromVideo = (el) => {
    if (!el) {
        return null;
    }
    const texture = new THREE.VideoTexture(el);
    handleTextureProp(el, texture);
    return texture;
};
const getUniformFromAsset = (el, name, parent = null) => {
    if (!el) {
        return {};
    }
    let texture = null;
    const type = el.getAttribute("type") || "2d";
    if (el instanceof HTMLImageElement) {
        if (type === "2d") {
            texture = loadTextureFromImg(el);
        }
        else if (type === "cube") {
            const px = parent?.querySelector("[cube=px]");
            const nx = parent?.querySelector("[cube=nx]");
            const py = parent?.querySelector("[cube=py]");
            const ny = parent?.querySelector("[cube=ny]");
            const pz = parent?.querySelector("[cube=pz]");
            const nz = parent?.querySelector("[cube=nz]");
            texture = loadCubemapFromImgs(el, [px, nx, py, ny, pz, nz]);
        }
    }
    else if (el instanceof HTMLVideoElement) {
        texture = loadTextureFromVideo(el);
    }
    const uniformName = {
        "2d": name,
        cube: `${name}Cube`,
    }[type] || name;
    const uniform = texture
        ? {
            [uniformName]: {
                value: texture,
            },
            [`${uniformName}Resolution`]: {
                value: new THREE.Vector2(texture.image?.width, texture.image?.height),
            },
        }
        : {};
    return uniform;
};
export { loadTextureFromImg, loadCubemapFromImgs, getUniformFromAsset };
