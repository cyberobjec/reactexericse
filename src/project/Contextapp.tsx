import { createContext, useContext } from 'react'

// 🟢 第一步：创建带类型的 Context
// 这里颜色只是字符串，如果以后想传复杂对象，把 string 换成对应接口即可
const ColorContext = createContext<string>('blue') // 默认值为 'blue'，避免 null

// 👶 孙子组件
function Child() {
  // 🟢 第三步：接收数据 —— 自动推导为 string
  const color = useContext(ColorContext)

  return <h1 style={{ color }}>我是收到颜色的孙子: {color}</h1>
}

// 👴 爷爷组件 (入口)
export default function App() {
  const myColor: string = 'blue'

  return (
    // 🟢 第二步：广播数据
    <ColorContext.Provider value={myColor}>
      <div style={{ border: '1px solid #ccc', padding: '20px' }}>
        <p>我是爷爷，我发出了: {myColor}</p>
        <Child />
      </div>
    </ColorContext.Provider>
  )
}
