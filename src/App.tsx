import { useState , useEffect,useRef} from 'react'
import ResponsiveAppBar from './components/Navbar';
import './styles/main.css'
import './styles/custom.css'
import axios from 'axios'
import ComicsCarrousel from './components/ComicsCarousel';
import {Comic,Character,Creator,Event} from './interfacesAPI'
import {rankingConfig,comicsCarouselEndpoitsConfig,charactersCarouselEndpoitsConfig} from './carouselBreakpoints/comicsCarousel'
import Footer from './components/Footer';
import {Number} from './components/numbers/Numbers'
import * as dotenv from 'dotenv' 
// dotenv.config();
interface BannerContent{
  title: string,
  img:string,
  id:number,
}
const events : Array<BannerContent> = [
  {title:'House of M',img:'House-of-M.avif',id:251},
  {title:'Civil War',img:'Civil-War.jpg',id:238},
  {title:'Avengers VS X-Men',img:'ax.jpg',id:310},
  {title:'Secret Empire',img:'secret-empire-10.jpg',id:336},
];
const topten : Array<BannerContent> = [
  {title:'Civil War',img:'http://i.annihil.us/u/prod/marvel/i/mg/2/d0/51cb5356c2063/portrait_xlarge.jpg',id:238},
  {title:'Infinity Gauntlet',img:"http://i.annihil.us/u/prod/marvel/i/mg/7/70/5b749e4888ba7/portrait_xlarge.jpg",id:253},
  {title:'Age of Ultron',img:'http://i.annihil.us/u/prod/marvel/i/mg/c/10/51ca0fc4c83c8/portrait_xlarge.jpg',id:314},
  {title:'Infinity',img:'http://i.annihil.us/u/prod/marvel/i/mg/e/40/51c4aaa0b1f4f/portrait_xlarge.jpg',id:315},
  {title:'Fear Itself',img:"http://i.annihil.us/u/prod/marvel/i/mg/f/03/51099f8823d43/portrait_xlarge.jpg",id:302},
  {title:'Annihilation',img:"http://i.annihil.us/u/prod/marvel/i/mg/c/80/51c9ec5e90de1/portrait_xlarge.jpg",id:229},
  {title:'Secret Invasion',img:"http://i.annihil.us/u/prod/marvel/i/mg/6/70/51ca1749980ae/portrait_xlarge.jpg",id:269},
  {title:'House of M',img:"http://i.annihil.us/u/prod/marvel/i/mg/e/90/51cb5330eabdf/portrait_xlarge.jpg",id:251},
  {title:"Avengers Disassembled",img:"http://i.annihil.us/u/prod/marvel/i/mg/1/03/52127e32d3671/portrait_xlarge.jpg",id:234},
  {title:"Secret Wars (2015)",img:"http://i.annihil.us/u/prod/marvel/i/mg/c/70/545be45c5d6cc/portrait_xlarge.jpg",id:323},
]
function App() {
  const dataFetchedRef = useRef(false);
  const [comics,setComics] = useState<Array<Comic>>([]);
  const [comicsCharac1,setComicsCharac1] = useState<Array<Comic>>([]);
  const [charac1,setCharac1] = useState<string>("");
  const [charac2,setCharac2] = useState<string>("");
  const [a,setA] = useState<Array<Event>>([]);
  const [comicsCharac2,setComicsCharac2] = useState<Array<Comic>>([]);
  const [creators,setCreators] = useState<Array<Creator>>([]);
  const [characters,setCharacters] = useState<Array<Character>>([]);
  const formatDate = (date : string | undefined) : string | undefined => {
    if(!date) return date; 
    const obj = new Date(date);
    return  obj.toLocaleDateString();
  }
  useEffect(()=>{
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    const fetchComics =async () => {
      try{
        const response = await axios.get(`https://gateway.marvel.com/v1/public/comics?${import.meta.env.VITE_API_KEY}&dateDescriptor=thisMonth`)
        setComics(response.data.data['results']);
        console.log(response.data.data['results'])
      }
      catch( e ){
        console.error(e)
      }
    }

    const fetchCharacters =async () => {
      try{
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?${import.meta.env.VITE_API_KEY}&events=315&limit=40`);
        const characters : unknown = response.data.data['results'];
        setCharacters(response.data.data['results']);
        const fristCharacIndex : number=Math.floor(Math.random()*(characters as Array<Character>).length);
        const secondCharacIndex : number = fristCharacIndex==(characters as Array<Character>).length-1?0: fristCharacIndex + 1;
        const fristCharac : Character = (characters as Array<Character>)[fristCharacIndex];
        const secondCharac : Character = (characters as Array<Character>)[secondCharacIndex];
        
        axios.get(`https://gateway.marvel.com/v1/public/comics?${import.meta.env.VITE_API_KEY}&characters=${fristCharac.id}`)
        .then(response=>{
          setComicsCharac1(response.data["data"]["results"]);
          setCharac1(fristCharac.name);
        })
        .catch(e=>console.error(e));
        axios.get(`https://gateway.marvel.com/v1/public/comics?${import.meta.env.VITE_API_KEY}&characters=${secondCharac.id}`)
        .then(response=>{
          setComicsCharac2(response.data["data"]["results"]);
          setCharac2(secondCharac.name);
        })
        .catch(e=>console.error(e));        
       
      }
      catch( e ){
        console.error(e)
      }
    }

    fetchComics();
    fetchCharacters();
    
    },[]);
  return (
    <>
      
      <ResponsiveAppBar/>
      <ComicsCarrousel 
        dots={true}
        autopass={true}
        loop={true} 
        slides={{number:events.length,perView:1,origin:0}} 
        arrows={true} >
        {events.length>0?
              events.map((event)=>(
                
                <div className="keen-slider__slide " style={{maxHeight:'75vh'}} key={event.id}>
                  <a   href="" className='comic'>
                  <img className='bannerImg' style={{width:'100%'}} src={event.img} alt="" />
                  <div className='eventTitle'>
                    <span>{event.title}</span>

                  </div>
                  </a>
                </div>
              )):""  
        }
      </ComicsCarrousel>
      <section className="characterSection">
          <h1>EXPLORE BY CHARACTER</h1>
          <ComicsCarrousel breakpoints={charactersCarouselEndpoitsConfig} slides={{perView:11,spacing:10}}>
            {characters.length>0?
                  characters.map(character=>(
                    character.thumbnail?.path=="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"?'':
                    <div  className="keen-slider__slide " key={String(character.id)}>
                      <a href=""  className='character' title={character.name}>
                        <img style={{width:'100%'}} src={`${character.thumbnail?.path}/standard_medium.${character.thumbnail?.extension}`} alt="" />
                      </a>
                    </div>
                  )):""
                  
                }
          </ComicsCarrousel>
      </section>
      <section className='comicsSection'>
        <h1>LATEST COMICS</h1>
        <ComicsCarrousel  arrows={true} breakpoints={comicsCarouselEndpoitsConfig}>
          {comics.length>0?
                comics.map(comic=>(
                  <div className="keen-slider__slide " key={String(comic.id)}>
                    <a href="" className='comic'>

                    <img src={`${comic.thumbnail?.path}/portrait_xlarge.${comic.thumbnail?.extension}`} alt="" />
                    <div className="comicsdesc">
                      <>
                        <h6>{comic.title}</h6>
                        <span>{`format: ${comic.format}`}</span>
                        <span>{`date: ${formatDate(comic.dates?.at(0)?.date)}`}</span>
                        <span>{`price:$ ${comic.prices[0].price}`}</span>
                        <span>{`number of pages: ${comic.pageCount}`}</span>
                      </>
                    </div>
                    </a>
                  </div>
                )):""
          }
        </ComicsCarrousel>
      </section> 

      <section className='comicsSection'>
        <h1>MARVEL'S EVENTS TOP 10</h1>
        <ComicsCarrousel breakpoints={rankingConfig}  arrows={true} slides={{number:10,perView:10,spacing:4}}>
          {topten.length==10?
                topten.map((item,index)=>(
                  <div className="keen-slider__slide event_slide" key={String(item.id)}>
                    <Number number={index+1}/>
                    <img  src={item.img} alt={item.title} />
                    
                  </div>
                )):""
          }
        </ComicsCarrousel>
      </section> 




      { !(comicsCharac2.length>0 && charac2) ? ''  : 
      <section className='comicsSection'>
        <h1>{`COMICS WITH ${charac2.toUpperCase()}`}</h1>
        <ComicsCarrousel  arrows={true} breakpoints={comicsCarouselEndpoitsConfig}>
          {
                comicsCharac2.map(comic=>(
                  <div className="keen-slider__slide " key={String(comic.id)}>
                    <a href="" className='comic'>

                    <img src={`${comic.thumbnail?.path}/portrait_xlarge.${comic.thumbnail?.extension}`} alt="" />
                    <div className="comicsdesc">
                      <>
                        <h6>{comic.title}</h6>
                        <span>{`format: ${comic.format}`}</span>
                        <span>{`date: ${formatDate(comic.dates?.at(0)?.date)}`}</span>
                        <span>{`price:$${comic.prices[0].price}`}</span>
                        <span>{`number of pages: ${comic.pageCount}`}</span>
                      </>
                    </div>
                    </a>
                  </div>
                ))
          }
        </ComicsCarrousel>
      </section> }
      { !(comicsCharac1.length>0 && charac1) ? ''  : 
      <section className='comicsSection'>
        <h1>{`COMICS WITH ${charac1.toUpperCase()}`}</h1>
        <ComicsCarrousel  arrows={true} breakpoints={comicsCarouselEndpoitsConfig}>
          {
                comicsCharac1.map(comic=>(
                  <div className="keen-slider__slide " key={String(comic.id)}>
                    <a href="" className='comic'>

                    <img src={`${comic.thumbnail?.path}/portrait_xlarge.${comic.thumbnail?.extension}`} alt="" />
                    <div className="comicsdesc">
                      <>
                        <h6>{comic.title}</h6>
                        <span>{`format: ${comic.format}`}</span>
                        <span>{`date: ${formatDate(comic.dates?.at(0)?.date)}`}</span>
                        <span>{`price:$${comic.prices[0].price}`}</span>
                        <span>{`number of pages: ${comic.pageCount}`}</span>
                      </>
                    </div>
                    </a>
                  </div>
                ))
          }
        </ComicsCarrousel>
      </section> }      
      <Footer/>


    </>
  )
  }

export default App
