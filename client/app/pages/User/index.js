import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Media from 'react-bootstrap/Media'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
/* import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import ListGroup from 'react-bootstrap/ListGroup'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup' */
//import config from '../../../config'
const baseUrl = '/assets/content/'
import './style.scss'

async function getProfile(uid) {
    try {
        const response = await axios({
            url: `${baseUrl}/profile/${uid}`,
            method: 'GET'
        })
        return response
    } catch (error) {
        console.log(error)
    }
  }

const UserProfile = (props) => {
    const [profile, setPerfil] = useState({
        firstName: 'Fran',
        lastName: 'Mazzarella',
        avatar: 'favicon.png',
        poster: {
            src:'unsplash.jpeg',
            apendice:'Playa del Carmen - Mexico'
        },
        description: 'Esta es una breve descripcion del perfil de fran',
        waves: '356',
        followersCount: '99',
        followedCount: '65',
        profileTypes: {
            premium: true,
            rider: true,
            ph: false,
            market: false
        }
    })
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadProfile(){
                getProfile(props.match.params.any).then(preprof => {
                    preprof? setPerfil(preprof) : null
                }).catch(error => {
                    console.log('error al cargar perfil')
                    //set error
                })
            }
            loadProfile()
            setLoading(false)
    },[])

    return (
        loading? 'Loading' :
        <Container fluid className="p-0 pb-4 my-4 mb-0 h-100">
            <Jumbotron fluid className="h-50 p-0" style={{backgroundImage: profile.poster.src!=''? `url(/assets/img/${profile.poster.src})` : 'url(/assets/img/unsplash.jpeg)'}}>{/* esto podria ser reemplazado por la foto de la semana del photografo elegido */}
                <Container className="h-100">
                    <Media className="h-100">
                        <Media.Body className="text-right align-self-end my-2">
                            <span className="text-white shadow">{profile.poster.apendice!=''? profile.poster.apendice : 'Playa del Carmen - Mexico'}</span>
                        </Media.Body>
                    </Media>
                </Container>
            </Jumbotron>
            <Container>
                <Media style={{marginTop: '-50px'}}>
                    <img
                    width={100}
                    height={100}
                    className="shadow align-self-center rounded-circle border border-white mr-3"
                    src={profile.avatar!=''? `/${profile.avatar}` : "/favicon.png"}
                    alt="Foto de perfil"
                    />
                    <Media.Body className="align-self-center mt-4">
                        <h5>{(profile.firstName!='' || profile.lastName!='')? `${profile.firstName} ${profile.lastName}`: profile.local.username}</h5>
                        <p>{(profile.description!='')? profile.description: null}</p>
                    </Media.Body>
                </Media>
{/*                 <ListGroup variant="flush" className="my-3">
                    <ListGroup.Item className="d-flex justify-content-between">
                            <span className="align-self-center">355 Waves</span> <Button variant="light">+ 1 Wave</Button>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between"><span className="align-self-center">99 Seguidores</span> <Button variant="light">Follow</Button><Button variant="warning">UN-Follow</Button></ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between"><span className="align-self-center">101 Siguiendo</span></ListGroup.Item>
                    <ListGroup.Item variant="info" className="d-flex justify-content-center">Cuenta RIDER verificada</ListGroup.Item>
                    <ListGroup.Item variant="dark" className="d-flex justify-content-center">Cuenta PH verificada</ListGroup.Item>
                    <ListGroup.Item variant="light" className="d-flex justify-content-center">Cuenta MARKET verificada</ListGroup.Item>
                    <ListGroup.Item variant="primary" className="d-flex justify-content-center">Cuenta PREMIUM verificada</ListGroup.Item>
                </ListGroup> */}
{/*                 <Container>
                    <ul className="">
                        <li>Surfer</li>
                        <li>Fotografo</li>
                        <li>Amante de la playa</li>
                        <li>Animal Lover</li>
                    </ul>
                </Container> */}
<Navbar sticky="bottom" fixed="bottom" bg="light" className="card-columns d-flex flex-nowrap justify-content-around">
    {/* home */}<Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="25" height="25" viewBox="0 0 161 161" > <defs> <path id="a" d="M0 161V0h161v161H0zM93.81 60.54l-.67 16.77-.05 1.31-.05 1.25-.06 1.21-.06 1.15-.06 1.1-.07 1.06-.07 1-.07.96-.08.92-.08.86-.09.83-.1.78-.1.74-.11.7-.11.66-.12.62-.13.58-.14.54-.14.51-.16.48-.16.44-.17.41-.18.38-.19.35-.2.32-.21.29-.22.27-.23.23-.24.22-.26.18-.27.17-.28.14-.29.13-.31.1-.32.09-.33.06-.35.05-.36.04-.37.02h-.64l-.13-.01-.13-.01-.13-.01-.14-.02-.14-.02-.14-.02-.14-.02-.15-.03-.14-.03-.15-.03-.15-.03-.15-.04-.15-.04-.15-.04-.15-.04-.15-.04-.16-.05-.15-.05-.15-.05-.15-.05-.15-.06-.15-.05-.15-.06-.15-.06-.15-.06-.14-.07-.15-.06-.14-.07-.14-.07-.13-.07-.14-.07-.13-.07-.13-.07-.12-.08-.13-.08-.12-.07-.11-.08-.11-.08-.12-.1-.11-.11-.1-.14-.11-.15-.1-.18-.11-.2-.1-.21-.09-.24-.1-.25-.09-.27-.1-.3-.09-.31-.08-.34-.09-.35-.09-.37-.08-.4-.08-.41-.08-.43-.07-.46-.08-.47-.07-.49-.07-.51-.07-.53-.06-.56-.07-.57-.06-.59-.06-.61-.06-.63-.05-.65-.06-.67-.05-.69-.05-.71-.05-.73-.04-.75-.05-.77-.04-.79-.04-.81-.04-.83-.04-.85-.03-.86-.53-17.43h-7.78l-.29.01h-.28l-.28.01-.28.01-.27.01-.27.01-.27.02-.26.01-.26.02-.26.01-.25.02-.25.02-.24.02-.23.02-.23.02-.23.03-.21.02-.22.03-.2.02-.2.03-.19.03-.18.03-.17.03-.17.03-.16.03-.15.03-.14.04-.13.03-.12.04-.11.03-.11.04-.09.03-.08.04-.07.04-.06.04-.05.04-.03.04-.04.04-.04.07-.04.09-.04.12-.03.14-.04.16-.04.19-.03.21-.04.23-.03.25-.04.28-.03.29-.03.31-.03.33-.03.35-.03.37-.03.39-.03.4-.02.42-.03.43-.02.45-.03.46-.02.48-.02.49-.02.51-.02.51-.02.53-.01.54-.02.56-.01.56-.02.57-.01.58-.01.59-.01.6-.01.6v.62l-.01.62V79.92l.01.88.01.85.01.81.01.78.02.75.02.72.02.69.03.66.03.64.03.61.04.59.04.56.05.55.05.53.05.5.06.5.07.47.07.46.07.45.08.44.09.43.09.42.1.41.11.41.11.4.12.4.12.4.13.39.14.4.15.4.16.4.16.41.17.42.18.42.19.43.19.44.21.45.33.69.35.68.35.65.37.64.37.62.39.6.39.59.4.57.42.55.42.53.44.52.44.5.45.48.47.46.47.45.49.43.49.42.5.39.52.38.52.37.54.34.54.33.55.31.57.3.57.28.59.26.59.24.6.23.62.21.62.19.63.18.65.16.65.15.66.12.68.12.68.09.7.08.7.06.71.04.73.03h.78l.37-.01.37-.01.36-.01.35-.02.34-.01.34-.03.33-.02.32-.03.31-.03.31-.03.3-.04.3-.04.28-.05.29-.05.28-.05.27-.06.27-.06.26-.06.26-.07.26-.08.25-.08.25-.08.25-.09.24-.09.24-.09.24-.11.23-.1.23-.11.24-.12.23-.12.23-.13.22-.13.23-.14.23-.14.23-.15.23-.16.22-.16.23-.17 4.13-2.92 4.79 2.79.81.45.83.41.85.37.85.33.87.29.87.26.88.22.89.18.9.14.9.1.9.07.9.04.91-.01.9-.03.9-.08.9-.11.89-.14.89-.17.88-.21.87-.25.87-.27.85-.31.84-.34.83-.37.81-.41.8-.43.78-.47.76-.5.74-.52.72-.56.7-.59.68-.61.65-.64.63-.68.6-.7.57-.72.54-.76.51-.78.48-.81.45-.84.17-.33.16-.34.15-.33.14-.33.14-.33.14-.33.12-.33.12-.34.12-.34.11-.35.1-.36.1-.37.09-.38.09-.38.09-.41.07-.41.08-.44.06-.44.07-.47.06-.49.05-.5.05-.53.05-.56.05-.57.04-.61.03-.62.03-.66.03-.69.03-.72.02-.75.02-.79.02-.82.02-.85.01-.89.01-.94.01-.97v-1.01l.01-1.06V59.88h-14.64v19.77l-.01.96v.91l-.01.87-.01.83-.01.79-.02.75-.01.71-.02.68-.03.64-.02.62-.03.57-.04.55-.03.52-.04.49-.05.46-.05.43-.05.42-.06.38-.06.37-.06.34-.08.33-.07.3-.08.29-.09.28-.1.25-.1.25-.1.23-.11.22-.12.22-.12.2-.14.2-.13.19-.15.18-.15.18-.16.18-.17.18-.18.18-.27.26-.28.25-.28.24-.28.22-.29.2-.3.2-.3.18-.3.16-.3.15-.3.14-.31.12-.31.11-.31.1-.31.08-.31.07-.3.05-.31.04-.31.03-.31.01h-.3l-.31-.01-.3-.03-.3-.04-.29-.06-.29-.07-.29-.08-.28-.09-.28-.11-.28-.13-.27-.14-.26-.15-.26-.16-.25-.18-.24-.19-.23-.21-.23-.21-.22-.24-.22-.24-.2-.26-.19-.27-.12-.18-.12-.18-.11-.19-.1-.2-.1-.21-.1-.23-.1-.23-.09-.25-.09-.26-.08-.27-.08-.28-.08-.3-.07-.32-.07-.33-.07-.35-.06-.36-.06-.38-.06-.4-.06-.42-.05-.44-.05-.45-.04-.48-.04-.5-.04-.52-.04-.54-.03-.56-.04-.59-.02-.61-.03-.63-.02-.66-.03-.69-.01-.71-.02-.74-.01-.77-.02-.79-.01-.82v-.86l-.01-.88V59.74l-7.59.4-7.71.4zm-42.1-13.96l-.58.03-.58.04-.59.06-.58.08-.59.1-.59.11-.58.12-.59.15-.58.16-.58.17-.58.2-.57.2-.58.22-.57.24-.56.25-.56.26-.56.28-.55.29-.54.31-.54.32-.53.33-.53.34-.51.36-.51.37-.5.38-.49.39-.49.4-.47.42-.46.43-.45.43-.44.45-.43.46-.42.47-.4.48-.4.49-.38.49-.36.51-.35.52-.34.52-3.86 5.99v48.7h14.64V89.15h14.63V73.18H49l-.42-.01h-.41l-.38-.01-.37-.01-.35-.01-.34-.02-.31-.01-.31-.02-.28-.03-.27-.02-.26-.03-.24-.03-.23-.04-.21-.03-.2-.05-.19-.04-.17-.05-.17-.05-.15-.06-.14-.06-.13-.07-.12-.07-.1-.07-.1-.08-.09-.08-.08-.09-.07-.09-.07-.1-.05-.11-.05-.11-.04-.11-.04-.12-.02-.13-.03-.13-.01-.14-.01-.14-.01-.15v-.16l.01-.25.04-.27.07-.27.09-.28.11-.29.14-.29.15-.3.18-.31.2-.3.22-.32.23-.31.25-.31.27-.32.28-.31.29-.32.31-.31.32-.31.33-.3.34-.3.34-.3.36-.29.36-.28.37-.27.37-.27.38-.25.38-.25.38-.23.38-.22.38-.21.38-.2.38-.18.38-.16.37-.15.37-.13.36-.11.35-.1.34-.07.34-.06.33-.03.31-.01.15-.01.14-.01.14-.02.13-.04.13-.04.13-.05.12-.06.13-.07.11-.07.12-.09.11-.1.11-.1.1-.12.1-.12.1-.13.1-.14.09-.16.09-.16.08-.16.08-.18.08-.19.08-.2.07-.2.07-.22.06-.22.06-.24.06-.24.06-.25.05-.26.05-.27.04-.28.04-.29.04-.29.04-.31.03-.32.03-.32.02-.34.02-.34.02-.35.01-.36v-7.32h-4.92l-.58.01z" ></path> <mask id="b" width="165" height="165" x="-2" y="-2" maskUnits="userSpaceOnUse" > <path fill="#fff" d="M-2 -2H163V163H-2z"></path> <use xlinkHref="#a"></use> </mask> </defs> <g mask="url(#b)"> <use fillOpacity="0" stroke="#000" strokeWidth="5" xlinkHref="#a"></use> </g> </svg></Button>
    {/* <Button variant="light">AG</Button> */}
    {/* agregar foto/post */}<Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }} > <defs> <clipPath id="a"> <path d="M0 0H50V50H0z"></path> </clipPath> </defs> <g clip-path="url(#a)"> <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M-12 0h24M0-12v24M0-21c-11.598 0-21 9.402-21 21s9.402 21 21 21 21-9.402 21-21-9.402-21-21-21z" display="block" transform="translate(25 25)" ></path> </g> </svg></Button>
    {/* comprar / vender */}<Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }} > <defs> <clipPath id="a"> <path d="M0 0H50V50H0z"></path> </clipPath> <mask id="e"> <g display="block"> <path fill="#27B363" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> </g> </mask> <mask id="d"> <g display="block"> <path fill="#27B363" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> </g> </mask> <mask id="c"> <g display="none"> <path fill="#27B363" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> </g> </mask> <mask id="b"> <g display="none"> <path fill="#27B363" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> </g> </mask> </defs> <g clip-path="url(#a)"> <g display="none" mask="url(#b)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(0 .062) translate(35.38 17.65)" ></path> </g> <g display="none" mask="url(#c)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(27.38 17.65)" ></path> </g> <g display="block" mask="url(#d)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(0 .062) translate(35.38 17.65)" ></path> </g> <g display="block" mask="url(#e)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(27.38 17.65)" ></path> </g> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M19.5 20H3.639a3.701 3.701 0 01-3.59-2.803l-8.598-34.394C-8.935-18.739-10.55-20-12.139-20H-19.5" transform="translate(21.5 23)" ></path> <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M3 0a3 3 0 10-6 0 3 3 0 006 0z" transform="translate(26 46)" ></path> <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M3 0a3 3 0 10-6 0 3 3 0 006 0z" transform="translate(39 46)" ></path> <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M-15.75-9.5h31.5l-7 19H-11" transform="translate(31.25 25.5)" ></path> </g> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" d="M1.5 0a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 011.5 0z" transform="translate(2 4)" ></path> <path d="M1.5 0a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 011.5 0z" transform="translate(2 4)" ></path> </g> </g> </svg></Button>
    {/* settings */}<Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }} > <defs> <clipPath id="a"> <path d="M0 0H50V50H0z"></path> </clipPath> </defs> <g clip-path="url(#a)"> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M13 1.6v-3.199L9.1-2.2C8.9-3.099 8.5-4 8-4.799L10.3-8 8-10.4 4.8-8.099C4-8.599 3.1-8.9 2.2-9.2L1.6-13h-3.2l-.6 3.8c-.9.2-1.8.601-2.6 1.101L-8-10.4l-2.3 2.301L-8.1-4.9c-.5.801-.8 1.7-1.1 2.601l-3.8.7V1.6l3.8.7c.2.901.6 1.8 1.1 2.601L-10.4 8l2.3 2.3 3.2-2.2c.8.5 1.7.801 2.6 1.101L-1.7 13h3.2l.7-3.799C3.1 9 4 8.6 4.8 8.1L8 10.401 10.3 8.1 8 4.901c.5-.801.8-1.7 1.1-2.601l3.9-.7z" transform="translate(16 34)" ></path> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M0 4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" transform="translate(16 34)" ></path> </g> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M10.55 6l1.2-2.8-3.1-1.9c.1-.9.1-1.7 0-2.6l3.1-1.9-1.1-2.8-3.6.8c-.5-.7-1.1-1.3-1.8-1.8l.8-3.5-2.8-1.2-1.9 3c-.9-.1-1.7-.2-2.6 0l-1.9-3.1-2.8 1.1.7 3.5c-.5.5-1.1 1.1-1.7 1.8l-3.5-.8-1.2 2.8 3 2c-.1.9-.1 1.7 0 2.6l-3.1 1.9 1.1 2.8 3.5-.7c.5.7 1.1 1.3 1.8 1.8l-.8 3.5 2.8 1.2 2-3c.9.1 1.7.1 2.6 0l1.9 3.1 2.8-1.1-.8-3.8c.7-.5 1.3-1.1 1.8-1.8l3.6.9z" transform="translate(34.95 15.1)" ></path> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M0-4a4 4 0 100 8 4 4 0 000-8z" transform="translate(35 15)" ></path> </g> </g> </svg></Button>
</Navbar>
                
            </Container>
            <Container className={
window.innerWidth<575? 'pb-4 mb-4 mx-0 px-0' : 'pb-4 mb-4 mx-auto px-auto'
}>
            <CardColumns>
                <Card>
                    <Card.Img variant="top" src="/favicon.png" />
                    <div className="ml-auto mr-0 mb-3 d-block">
                        <Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }} > <defs> <clipPath id="a"> <path d="M0 0H50V50H0z"></path> </clipPath> </defs> <g clip-path="url(#a)"> <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M-12 0h24M0-12v24M0-21c-11.598 0-21 9.402-21 21s9.402 21 21 21 21-9.402 21-21-9.402-21-21-21z" display="block" transform="translate(25 25)" ></path> </g> </svg></Button>
                        <Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }} > <defs> <clipPath id="a"> <path d="M0 0H50V50H0z"></path> </clipPath> <mask id="e"> <g display="block"> <path fill="#27B363" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> </g> </mask> <mask id="d"> <g display="block"> <path fill="#27B363" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> </g> </mask> <mask id="c"> <g display="none"> <path fill="#27B363" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M35.625-12.375v24.75h-71.25v-24.75h71.25z" transform="translate(25 25) translate(-1.125 -21.375)" ></path> </g> </mask> <mask id="b"> <g display="none"> <path fill="#27B363" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> <path fillOpacity="0" stroke="#000" strokeWidth="0" d="M6.438-18.875L6.5-14l4.688 5.125L30.063-9l-14-10.563" transform="translate(25 25)" ></path> </g> </mask> </defs> <g clip-path="url(#a)"> <g display="none" mask="url(#b)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(0 .062) translate(35.38 17.65)" ></path> </g> <g display="none" mask="url(#c)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(27.38 17.65)" ></path> </g> <g display="block" mask="url(#d)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(0 .062) translate(35.38 17.65)" ></path> </g> <g display="block" mask="url(#e)"> <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M10.474 0L0 10.474-10.474 0 0-10.474 10.474 0z" transform="translate(27.38 17.65)" ></path> </g> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M19.5 20H3.639a3.701 3.701 0 01-3.59-2.803l-8.598-34.394C-8.935-18.739-10.55-20-12.139-20H-19.5" transform="translate(21.5 23)" ></path> <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M3 0a3 3 0 10-6 0 3 3 0 006 0z" transform="translate(26 46)" ></path> <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M3 0a3 3 0 10-6 0 3 3 0 006 0z" transform="translate(39 46)" ></path> <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M-15.75-9.5h31.5l-7 19H-11" transform="translate(31.25 25.5)" ></path> </g> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" d="M1.5 0a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 011.5 0z" transform="translate(2 4)" ></path> <path d="M1.5 0a1.5 1.5 0 11-3.001-.001A1.5 1.5 0 011.5 0z" transform="translate(2 4)" ></path> </g> </g> </svg></Button>
                        <Button variant="light"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50" style={{ width: "100%", height: "100%" }} > <defs> <clipPath id="a"> <path d="M0 0H50V50H0z"></path> </clipPath> </defs> <g clip-path="url(#a)"> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M13 1.6v-3.199L9.1-2.2C8.9-3.099 8.5-4 8-4.799L10.3-8 8-10.4 4.8-8.099C4-8.599 3.1-8.9 2.2-9.2L1.6-13h-3.2l-.6 3.8c-.9.2-1.8.601-2.6 1.101L-8-10.4l-2.3 2.301L-8.1-4.9c-.5.801-.8 1.7-1.1 2.601l-3.8.7V1.6l3.8.7c.2.901.6 1.8 1.1 2.601L-10.4 8l2.3 2.3 3.2-2.2c.8.5 1.7.801 2.6 1.101L-1.7 13h3.2l.7-3.799C3.1 9 4 8.6 4.8 8.1L8 10.401 10.3 8.1 8 4.901c.5-.801.8-1.7 1.1-2.601l3.9-.7z" transform="translate(16 34)" ></path> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M0 4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" transform="translate(16 34)" ></path> </g> <g display="block"> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M10.55 6l1.2-2.8-3.1-1.9c.1-.9.1-1.7 0-2.6l3.1-1.9-1.1-2.8-3.6.8c-.5-.7-1.1-1.3-1.8-1.8l.8-3.5-2.8-1.2-1.9 3c-.9-.1-1.7-.2-2.6 0l-1.9-3.1-2.8 1.1.7 3.5c-.5.5-1.1 1.1-1.7 1.8l-3.5-.8-1.2 2.8 3 2c-.1.9-.1 1.7 0 2.6l-3.1 1.9 1.1 2.8 3.5-.7c.5.7 1.1 1.3 1.8 1.8l-.8 3.5 2.8 1.2 2-3c.9.1 1.7.1 2.6 0l1.9 3.1 2.8-1.1-.8-3.8c.7-.5 1.3-1.1 1.8-1.8l3.6.9z" transform="translate(34.95 15.1)" ></path> <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M0-4a4 4 0 100 8 4 4 0 000-8z" transform="translate(35 15)" ></path> </g> </g> </svg></Button>
                    </div>
                    <Card.Body className="flex-wrap mt-1">
                        <Card.Subtitle className="mb-1">18 Waves · FulanoDeTal descripcion de la foto #bla #ble #bli</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk
                            of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <InputGroup className="">
                        <FormControl
                        placeholder="Deja tu comentario"
                        aria-label="Deja tu comentario"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">Enviar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Card>
            </CardColumns>
            </Container> 
    </Container>
    )
}
export default UserProfile