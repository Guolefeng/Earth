import { useEffect } from 'react'

const AddEntites = () => {
    useEffect(() => {
        const { viewer, Cesium } = window
        // Load the NYC buildings tileset
        const city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({ url: Cesium.IonResource.fromAssetId(75343) }))
        viewer.flyTo(city);
        return () => {
            viewer.scene.primitives.remove(city);
        }
    }, [])
    return null
}

export default AddEntites