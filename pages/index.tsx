import Tab from "../components/core-ui/tab/Tab"

const HomePage: React.FC = (props) => {
  return <div className="w-full">
    <Tab>
      <div label="Genel Rapor">
        test
      </div>
      <div label="Genel Rapor 2">
        test 2
      </div>
    </Tab>
  </div>
}

export default HomePage
