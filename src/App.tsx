/**
 * 待办事项应用组件
 *
 * 功能说明：
 * 1. 管理待办事项列表（增删改查）
 * 2. 支持任务完成状态切换
 * 3. 使用 localStorage 持久化存储数据
 * 4. 实时同步数据到本地存储
 */

import { useState, useEffect } from 'react'

/**
 * Todo 类型定义
 * 描述单个待办事项的数据结构
 */
interface Todo {
  id: number // 唯一标识符
  text: string // 任务文本内容
  done: boolean // 完成状态
}

function App() {
  /**
   * todos 状态：存储所有待办事项的数组
   *
   * 初始化逻辑：
   * - 使用函数式初始化，在组件首次渲染时执行
   * - 从 localStorage 读取之前保存的数据
   * - 如果存在数据，解析 JSON 字符串为数组
   * - 如果不存在，返回空数组作为初始值
   *
   * 数据结构：每个 todo 对象包含：
   * - id: 唯一标识符（数字）
   * - text: 任务文本内容（字符串）
   * - done: 完成状态（布尔值）
   */
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todos = localStorage.getItem('todos')
    if (todos) {
      return JSON.parse(todos) as Todo[]
    }
    return []
  })

  /**
   * inputValue 状态：存储输入框的当前值
   *
   * 用途：
   * - 控制输入框的显示内容（受控组件）
   * - 在添加任务后清空输入框
   */
  const [inputValue, setInputValue] = useState('')

  /**
   * useEffect 副作用：监听 todos 变化，自动保存到 localStorage
   *
   * 执行时机：
   * - 组件首次挂载后执行一次
   * - 每当 todos 数组发生变化时执行
   *
   * 逻辑说明：
   * - 将 todos 数组转换为 JSON 字符串
   * - 保存到 localStorage 的 'todos' 键中
   * - 实现数据的持久化存储，刷新页面后数据不丢失
   */
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div style={{ padding: '20px' }}>
      <h1>代办清单 📝</h1>

      {/* 
        输入框：用于输入新的待办任务
        - value: 绑定 inputValue 状态，实现受控组件
        - onChange: 当用户输入时，更新 inputValue 状态
      */}
      <input
        type="text"
        placeholder="在这里输入新的任务"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {/* 
        添加按钮：将输入框的内容添加为新任务
        点击时的执行逻辑：
        1. 使用展开运算符 ...todos 保留原有所有任务
        2. 添加新任务对象：
           - id: 使用当前数组长度 + 1 作为新 ID（简单但不完美，实际项目中应使用更可靠的 ID 生成方式）
           - text: 使用当前 inputValue 的值
           - done: 初始化为 false（未完成状态）
        3. 调用 setTodos 更新状态，触发重新渲染
        4. 清空输入框：setInputValue('')，方便用户继续添加下一个任务
      */}
      <button
        onClick={() => {
          setTodos([
            ...todos,
            { id: todos.length + 1, text: inputValue, done: false },
          ])
          setInputValue('')
        }}
      >
        添加
      </button>

      {/* 
        任务列表：使用 map 方法将 todos 数组渲染为列表项
        重点说明：
        - map 方法遍历 todos 数组中的每个元素
        - 为每个元素（item）生成一个 <li> 标签
        - key 属性：使用 item.id 作为唯一标识，帮助 React 高效更新 DOM
      */}
      <ul>
        {todos.map((item: Todo) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {/* 
              复选框：用于切换任务的完成状态
              - checked: 绑定 item.done，控制复选框的选中状态
              - onChange: 点击时切换对应任务的完成状态
              
              切换逻辑说明：
              1. 使用 map 遍历所有 todos
              2. 找到 id 匹配当前项的任务（todo.id === item.id）
              3. 使用展开运算符复制该任务对象，并切换 done 属性（!todo.done）
              4. 其他任务保持不变
              5. 返回新数组并更新状态
            */}
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => {
                setTodos(
                  todos.map((todo: Todo) =>
                    todo.id === item.id ? { ...todo, done: !todo.done } : todo
                  )
                )
              }}
            />

            {/* 
              任务文本显示区域
              - 显示任务的文本内容（item.text）
              - 根据完成状态动态设置样式：
                * done === true: 添加删除线（line-through）
                * done === false: 无删除线（none）
              - marginLeft: 与复选框保持间距，提升视觉效果
            */}
            <span
              style={{
                marginLeft: '10px',
                textDecoration: item.done ? 'line-through' : 'none',
              }}
            >
              {item.text}
            </span>

            {/* 
              删除按钮：移除对应的任务
              
              删除逻辑说明：
              1. 使用 filter 方法过滤 todos 数组
              2. 保留所有 id 不等于当前项 id 的任务
              3. 返回新数组（不包含被删除的任务）
              4. 调用 setTodos 更新状态
              5. 由于状态更新，useEffect 会自动将新数组保存到 localStorage
            */}
            <button
              onClick={() => {
                setTodos(todos.filter((todo: Todo) => todo.id !== item.id))
              }}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
