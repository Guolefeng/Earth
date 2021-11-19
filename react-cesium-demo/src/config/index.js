import AddEntites from '../components/addEntities'
import Add3DTiles from '../components/add3DTiles'
import SetMaterial from '../components/setMaterial'

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
    }
}