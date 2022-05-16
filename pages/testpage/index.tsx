import { useState } from "react"
import { Input } from "../../components/core-ui/Input"
import { CodeMirrorTextarea } from "../../components/core-ui/CodeMirrorTextarea"

function TestPage(props) {
  const [form, setForm] = useState([{ name: "" }])
  return (
    <div className="w-full">
      <CodeMirrorTextarea mode={"javascript"} />
    </div>
  )
}

export default TestPage
