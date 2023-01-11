import Logo from './Logo'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Footer(){
    return(
        <footer id="pageFooter">
            <Logo id='logoFooter' variant='h2'/>
            <h2>CONTACT ME !</h2>
            <div className="contacts">
                <a target='_blank' href='https://api.whatsapp.com/send?phone=11971432754' className='contactInfo'>
                    <WhatsAppIcon style={{fontSize:'2rem'}}/>
                    <span>{'(11) 971432754'}</span>
                </a>
                <a target='_blank' href="mailto:vitoralmeida721@gmail.com" className='contactInfo'>
                    <AlternateEmailIcon style={{fontSize:'2rem'}}/>
                    <span>{'vitoralmeida721@gmail.com'}</span>
                    
                </a>
                <a target='_blank' href='https://github.com/VitorDalBelo' className='contactInfo'>
                    <GitHubIcon style={{fontSize:'2rem'}}/>
                    <span>{'github.com/VitorDalBelo'}</span>
                    
                </a>
                <a target='_blank' href='https://www.linkedin.com/in/vitor-almeida-dal-belo/' className='contactInfo'>
                    <LinkedInIcon style={{fontSize:'2rem' }}/>
                    <span>{'linkedin.com/in/vitor-almeida-dal-belo/'}</span>   
                </a>
            </div>
            {/* <ul>
                <li>{'(11)971432754'}</li>
                <li>vitoralmeida721@gmail.com</li>
                <li>vitor-almeida-dal-belo</li>
                <li>github.com/VitorDalBelo</li>
            </ul>    */}
            <p>
                This site is a portfolio project by Vitor De Almeida Dal Belo and has no commercial purposes.The data presented comes from a  <a href='https://developer.marvel.com/'>Marvel API</a>
            </p>  
        </footer>
    );
}