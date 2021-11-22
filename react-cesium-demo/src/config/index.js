import AddEntites from '../components/addEntities'
import Add3DTiles from '../components/add3DTiles'
import SetMaterial from '../components/setMaterial'
import Camera from '../components/camera'

export const MENU = {
    0: {
        name: '添加形状',
        component: <AddEntites />,
    },
    1: {
        name: '添加3DTiles',
        component: <Add3DTiles />,
    },
    2: {
        name: '设置材质',
        component: <SetMaterial />,
    },
    3: {
        name: '设置相机',
        component: <Camera />,
    }
}