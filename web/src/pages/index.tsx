//JSX - JavaScript + XML (HTML)
//TSX - TypeScript + JSX

//Exibe HTML
//className -> Tailwind
import Image from "next/image"
import appPreviewImg from '../assets/app-copa-preview.png'
import logoImg from '../assets/app-logo.svg'
import userAvatarsExempleImg from '../assets/app-avatars.png'
import iconnCheckImg from '../assets/icon-check.svg'
import { api } from "../lib/axios"
import { FormEvent, useState } from "react"
import { GetStaticProps } from "next"


//Define modelo de variaveis do typescript
interface HomeProps{
  poolCount: number;
  guessCount: number;
  usersCount: number;
}

export default function Home(props: HomeProps) {

  //Estado, informação/variavel em tempo real
  const [poolTitle, setPoolTitle] = useState('')

  //Previne que o formulario recarregue a página
  async function createPool(event: FormEvent){
    event.preventDefault()
 
    try {
      const response = await api.post('/pools', {
        title: poolTitle
      })

      const {code} = response.data

      //Copia para a area de transferencia do usuario
      await navigator.clipboard.writeText(code)
      alert('Bolão criado! Código copiado para a área de transferencia')
      setPoolTitle('')
    } catch (err) {
      console.log(err)
      alert('Falha ao criar o bolão , tente novamente')
    }
    
    }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa"/>
        
        <h1 
          className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>
        
        <div className="mt-10 flex items-center gap-2">
          <Image src={userAvatarsExempleImg} alt=""/>
          <strong className="text-gray-100 text-xl">
          <span className="text-ignite-500">+{props.usersCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
          className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
          type="text" 
          required 
          placeholder="Qual nome do seu bolão?"
          onChange={event => setPoolTitle(event.target.value)}
          value={poolTitle}
          />
          
          <button 
          className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700" 
          type="submit">CRIAR MEU BOLÃO</button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>
        
        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconnCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600"/>

          <div className="flex items-center gap-6">
            <Image src={iconnCheckImg} alt=""/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
            src={appPreviewImg}
            alt="Dois celulares com a aplicação mobile"
            quality={100}
          />
    </div>
  )
}

//Executa o JS no lado do servidor
export const getStaticProps: GetStaticProps = async () => {
  // Não é performatico pois uma chamada dependerá do termino da outra
  // const poolCountResponse = await api.get('pools/count')
  // const guessCountResponse = await api.get('guesses/count')

  const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count')
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
    revalidate: 60 * 10 
  }
}