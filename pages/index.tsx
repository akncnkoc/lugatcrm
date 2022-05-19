import { useState } from "react"
import { Input } from "../components/core-ui/Input";
import Tab from "../components/core-ui/tab/Tab"

const HomePage: React.FC = (props) => {
  const [form, setForm] = useState({
    name: ""
  });
  return (
    <div className="w-full">
      <Tab>
        <div label="Genel Rapor">
          <Input label="Ad" name="name" bindTo={setForm} />
        </div>
        <div label="Genel Rapor 2">test 2</div>
      </Tab>
    </div>
  )
}

export default HomePage
