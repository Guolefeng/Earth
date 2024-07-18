import React, { useEffect } from 'react'

let ds:any;

const DrawEntity = () => {
    const { Cesium, viewer } = window;

    useEffect(() => {
        draw();
        return () => {
            clear();
        }
    }, [])

    const draw = () => {
        Cesium.Math.setRandomNumberSeed(0);

        const promise = Cesium.GeoJsonDataSource.load('./data/100000_full.json');
        // const promise = Cesium.GeoJsonDataSource.load('./data/ne_10m_us_states.topojson');
        promise.then(function (dataSource: any) {
            ds = dataSource;

            viewer.dataSources.add(dataSource);
            // Get the array of entities
            const entities = dataSource.entities.values;

            const colorHash: any = {};
            for (let i = 0; i < entities.length; i++) {
                // For each entity, create a random color based on the state name.
                // Some states have multiple entities, so we store the color in a
                // hash so that we use the same color for the entire state.
                const entity = entities[i];
                const name = entity.name;
                let color = colorHash[name];
                if (!color) {
                    color = Cesium.Color.fromRandom({
                        alpha: 1.0,
                    });
                    colorHash[name] = color;
                }

                // Set the polygon material to our random color.
                entity.polygon.material = color;
                // Remove the outlines.
                entity.polygon.outline = false;

                entity.polygon.extrudedHeight = 50000;
            }
        }).catch(function (error: any) {
            // Display any errrors encountered while loading.
            window.alert(error);
        });
    }

    const clear = () => {
        ds && viewer.dataSources.remove(ds);
        // viewer.dataSources.removeAll();
    }

    return (
        <div></div>
    )
}

export default DrawEntity