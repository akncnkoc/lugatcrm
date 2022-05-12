import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Logo from "../assets/logo.png"
import Toast from "./core-ui/Toast"
const Layout: React.FC<any> = (props) => {
  return (
    <div className="overfloy-y-hidden flex h-screen w-full">
      <Toast />
      <Aside />
      <div className="flex h-screen flex-1 flex-col bg-gray-filler">
        <Header />
        <div className="flex overflow-y-scroll py-8 px-8 container mx-auto">{props.children}</div>
      </div>
    </div>
  )
}
const Aside = () => {
  return (
    <div
      id="aside"
      className="h-screen w-64 min-w-[256px] max-w-[256px] bg-aside-filler">
      <div className="py-4 text-center">
        <Image src={Logo} width={144} height={35} alt={"Logo"} />
      </div>
      <AsideMenu />
    </div>
  )
}

const AsideMenu = () => {
  const asideMenuItems = [
    {
      name: "Anasayfa",
      href: "/",
    },
    {
      name: "Kasa",
      href: "/safe",
    },
    {
      name: "Yazar Kasalar",
      href: "/cash_register",
    },
    {
      name: "Ürün",
      href: "/product",
    },
    {
      name: "Fatura",
      href: "/invoice",
    },
    {
      name: "Gider",
      href: "/expense",
    },
    {
      name: "Müşteri",
      href: "/customer",
    },
    {
      name: "Tedarikçi",
      href: "/supplier",
    },
    {
      name: "Personel",
      href: "/staff",
    },
    {
      name: "Kargo",
      href: "/cargo",
    },
    {
      name: "Ayarlar",
      href: "/setting",
    },
    {
      name: "Kullanıcılar",
      href: "/user",
    },
  ]
  const router = useRouter()
  return (
    <div id="asideMenu" className="flex flex-col">
      {asideMenuItems.map((item, index) => (
        <Link key={index} href={item.href} passHref>
          <div
            className={`flex h-[44px] cursor-pointer items-center px-6 text-[13px] font-normal leading-[20px] text-gray-color transition-colors hover:bg-active-aside-menu ${
              router.asPath === item.href ? "bg-active-aside-menu" : ""
            }`}>
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  )
}

const Header = () => {
  return (
    <div
      id="header"
      className="flex h-16 max-h-[64px] min-h-[64px] w-full flex-1 bg-white shadow-sm">
      <p>test</p>
    </div>
  )
}
export default Layout
