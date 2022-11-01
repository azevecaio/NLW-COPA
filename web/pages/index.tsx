//JSX - JavaScript + XML (HTML)
//TSX - TypeScript + JSX

//Define modelo de variaveis do typescript
interface HomeProps{
  count: number
}

//Exibe HTML
export default function Home(props: HomeProps) {
  return (
    <h1>Contagem: {props.count}</h1>
  )
}

//Executa o JS no lado do servidor
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  console.log(data)

  return {
    props: {
      count: data.count,
    }
  }
}