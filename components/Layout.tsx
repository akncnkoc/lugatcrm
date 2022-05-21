import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Logo from "../assets/logo.png"
import ConfirmDialog from "./core-ui/ConfirmDialog"
import Toast from "./core-ui/Toast"
import styled from "styled-components"
import { asideMenuItems } from "../store/asideMenuItems"

const LayoutStyled = styled.div`
  overflow-y: hidden;
  display: flex;
  height: 100vh;
  width: 100%;
`
const AsideStyled = styled.div`
  height: 100vh;
  width: 256px;
  min-width: 256px;
  max-width: 256px;
  background-color: rgb(30 30 45);
`
export const Header = styled.div`
  display: flex;
  height: 64px;
  min-height: 64px;
  max-height: 64px;
  width: 100%;
  flex: 1;
  background-color: white;
`
const AsideMenuItemStyled = styled.div<{ href: string; asPath: string }>`
  display: flex;
  height: 44px;
  cursor: pointer;
  align-items: center;
  padding: 0px 24px;
  font-size: 13px;
  font-weight: normal;
  line-height: 20px;
  color: rgb(162 163 183);
  transition: 500ms color, background-color;
  background-color: ${(props) =>
    props.href === props.asPath ? "rgb(27 27 40 / 1)" : ""};

  &:hover {
    background-color: rgb(27 27 40 / 1);
  }
`

const Layout: React.FC<any> = (props) => {
  return (
    <LayoutStyled>
      {/* <Toast /> */}
      <Aside />
      <ConfirmDialog />
      <div
        style={{
          display: "flex",
          height: "100vh",
          flex: 1,
          flexDirection: "column",
        }}>
        <Header />
        <div
          style={{
            flexDirection: "column",
            flex: 1,
              padding: "25px"
          }}>
          {props.children}
        </div>
      </div>
    </LayoutStyled>
  )
}

const Aside = () => {
  return (
    <AsideStyled>
      <div style={{ padding: "16px 0", textAlign: "center" }}>
        <Image src={Logo} width={144} height={35} alt={"Logo"} />
      </div>
      <AsideMenu />
    </AsideStyled>
  )
}

const AsideMenu = () => {
  const router = useRouter()

  return (
    <div
      style={{
        display: " flex",
        flexDirection: "column",
      }}>
      {asideMenuItems.map((item, index) => (
        <Link key={index} href={item.href} passHref>
          <AsideMenuItemStyled href={item.href} asPath={router.asPath}>
            {item.name}
          </AsideMenuItemStyled>
        </Link>
      ))}
    </div>
  )
}

export default Layout
