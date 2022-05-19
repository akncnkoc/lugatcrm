import styled from "styled-components"

const ErrorPage = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex: 1;
`
const ErrorPageTitle = styled.h1`
  color: #f44336;
  font-size: 30px;
`
export default function Custom404() {
  return (
    <ErrorPage>
      <ErrorPageTitle>
        🤷‍♂️Aradığınız sayfa hiç var olmadı ya da taşınmış olabilir.🤷‍♂️
      </ErrorPageTitle>
    </ErrorPage>
  )
}
