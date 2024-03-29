import  React , { useState , useEffect} from "react";
import './game.css' ;

import { useNavigate , useLocation} from "react-router-dom";

import map1 from "./sprites/map1.png";
import map2 from "./sprites/map2.png";
import map3 from "./sprites/map3.png";
import persona from "./sprites/personaAsh.png";
import radar from "./sprites/radar.gif";
import catching from "./sprites/catching.gif";

import Background from "../AnimatedBackground/backgroung.js";

const axios = require("axios");

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Game(){

    let all_pokemons = ['abra','absol','aerodactyl','aggron','aipom','alakazam','altaria','amaldo','ampharos','anorith','arbok','arcanine','ariados','aron','articuno','azumarill','azurill','bagon','baltoy','banette','barboach','bayleef','beautifly','beedrill','beldum','bellossom','bellsprout','blastoise','blaziken','blissey','breloom','bulbasaur','butterfree','cacnea','cacturne','camerupt','carvanha','cascoon','castform','caterpie','celebi','chansey','charizard','charmander','charmeleon','chikorita','chimecho','chinchou','clamperl','claydol','clefable','clefairy','cleffa','cloyster','combusken','corphish','corsola','cradily','crawdaunt','crobat','croconaw','cubone','cyndaquil','delcatty','delibird','deoxys','dewgong','diglett','ditto','dodrio','doduo','donaphan','dragonair','dragonite','dratini','drowzee','dugtrio','dunsparce','dusclops','duskull','dustox','eevee','ekans','electabuzz','electrike','electrode','elekid','entei','espeon','exeggcute','exeggutor','exploud','farfetch','fearow','feebas','feraligatr','flaaffy','flareon','flygon','foretress','furret','gardevoir','gastly','gengar','geodude','girafarig','glalie','gligar','gloom','golbat','goldeen','golduck','golem','gorebyss','granbull','graveler','grimer','groundon','grovyle','growlithe','grumpig','gulpin','gyarados','hariyama','haunter','heracross','hitmonchan','hitmonlee','hitmontop','ho-oh','hoothoot','hoppip','horsea','houndoom','houndour','huntail','hypno','igglybuff','illumise','ivysaur','jigglypuff','jirachi','jolteon','jumpluff','jynx','kabuto','kabutops','kadabra','kakuna','kangaskhan','kecleon','kingdra','kingler','kirlia','koffing','krabby','kyogre','lairon','lanturn','lapras','larvitar','latias','latios','ledian','ledyba','lickitung','lileep','linoone','lombre','lotad','loudred','ludicolo','lugia','lunatone','luvdisc','machamp','machoke','machop','magby','magcargo','magikarp','magmar','magnemite','magneton','makuhita','manectric','mankey','mantine','mareep','marill','marowak','marshtomp','masquerain','mawile','medicham','meditite','meganium','meowth','metagross','metang','metapod','mew','mewtwo','mightyena','milotic','miltank','minun','misdreavus','moltres','mudkip','muk','murkrow','natu','nidoking','nidoqueen','nidoran','nidorina','nidorino','nincada','ninetales','ninjask','noctowl','nosepass','numel','nuzleaf','octillery','oddish','omanyte','omastar','onix','paras','parasect','pelipper','persian','phanpy','pichu','pidgeot','pidgeotto','pidgey','pikachu','piloswine','pineco','pinsir','plusle','politoed','poliwag','poliwhirl','poliwrath','ponyta','poochyena','porygon','porygon2','primeape','psyduck','pupitar','quagsire','quilava','quilfish','raichu','raikou','ralts','rapidash','raticate','rattata','rayquaza','regice','regirock','registeel','relicanth','remoraid','rhydon','rhyhorn','roselia','salamence','sandshrew','sandslash','sapleye','sceptile','schuckle','scizor','scyther','seadra','seaking','sealeo','seedot','seel','sellow','sentret','seviper','sharpedo','shedinja','shelgon','shellder','shiftry','shroomish','shuppet','silcoon','skarmony','skiploom','skitty','slaking','slakoth','slowbro','slowking','slowpoke','slugma','smeargle','smoochum','sneazle','snorlax','snorunt','snubbull','solrock','spearow','spheal','spinarak','spinda','spoink','squirtle','stantler','starmie','staryu','steelix','sudowoodo','suicune','sunflora','sunkern','surskit','swablu','swalot','swampert','swinub','taillow','tangela','tauros','teddiursa','tentacool','tentacruel','togepi','togetic','torchic','torkoal','totodile','trapinch','treecko','tropius','typhlosion','tyranitar','tyrogue','umbreon','unown','ursaring','vaporeon','venomoth','venonat','venusaur','vibrava','victreebel','vigoroth','vileplume','volbeat','voltorb','vulpix','wailmer','wailord','walrein','wartortle','weedle','weepinbell','weezing','whiscash','whismur','wigglytuff','wingull','woobuffet','wooper','wurmple','wynaut','xatu','yanma','zangoose','zapdos','zigzagoon','zubat'];

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.username

    let [left , setLeft] = useState(250);
    let [top , setTop] = useState(200);

    let [pokeName, setPokeName] = useState(['']);
    let [pokeImg, setPokeImg] = useState(['']);
    let [baseExperience, setBaseExperience] = useState(['']);
    let [pokeType, setPokeType] = useState(['']);

    let [mapSelected, setMapSelected] = useState(location.state.mapSelected)

    async function findPokemon(pokemon){

        const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon + '/'
        
        axios
            .get(url)
            .then((response) => {
                
                if(response.status == 200){
                    let src_img = response.data.sprites.front_default 
                    let type = response.data.types[0].type.name
                    let experience = response.data.base_experience
                    
                    setPokeImg(src_img);
                    setBaseExperience(experience);
                    setPokeType(type);
                    setPokeName(pokemon)
                }
                
            }, (error) => console.log(error));
    }

    async function catchPokemon(){
        if (pokeName !== ''){
            navigate('/choosepokemon', {state:{username: user, enemy:pokeName, mapSelected:mapSelected}})
        }
    }

    const handleKey = (event) => {
        event.preventDefault();  
        if ((event.key == 'ArrowDown' || event.key == 's')) {

            let d_bottom = top+10

            if(d_bottom<410){
                setTop(d_bottom)
                document.getElementById("persona").style.top = top + 'px'
            }
            
          }

        if ((event.key == 'ArrowUp' || event.key == 'w')) {
           
            let d_top = top-10
            
            if(d_top>0){
                setTop(d_top);
                document.getElementById("persona").style.top = top + 'px';
            }
        }
        if ((event.key == 'ArrowLeft' || event.key == 'a')) {
            
            let d_left = left-10

            if(d_left>40) {
                setLeft(d_left)
                document.getElementById("persona").style.left = left + 'px'
            }
            
        }
        if ((event.key == 'ArrowRight' || event.key == 'd')) {
            

            let d_right = left+10

            if(d_right<450){
                setLeft(d_right)
                document.getElementById("persona").style.left = left + 'px'
            } 
        }
    };

    useEffect(() => {

        setPokeImg('');
        setBaseExperience('');
        setPokeType('');

        let number = randomInt(0,20);

        if(number < 3 && mapSelected !== 'capturando'){
            let pokemon_name = all_pokemons[randomInt(0, all_pokemons.length)];
            findPokemon(pokemon_name)
        }
        else{
            setPokeName('');
        }

    }, [top, left, mapSelected]);

    function voltarMenu(){
        navigate('/menu', {state: {username:user}} );
        
    }

    return (
        <>
             <Background></Background>
        
            <div className="backScreenGame">

                <div className="container">
                    <div className="mapGame"  tabIndex="0"  onKeyDown={(event) => handleKey(event)}>
                        
                        {mapSelected == 1 ? 
                        
                            <img src = {map1} className= "imgMapGame" alt="mapa1"></img> :
                            <>
                                {mapSelected == 2 ? <img src = {map2} className= "imgMapGame"alt="mapa2"></img> :
                                <>
                                     <img src = {map3} className= "imgMapGame" alt="mapa3"></img>
                                </>
                                } 
                            </>
                        }
                        <img src = {persona} className="persona"id="persona" alt ="personsa"></img>
                    </div>  

                    <div className="radarContainer">
                        <div className="radar">
                            <div className="pokemon">
                                {pokeImg != '' && baseExperience != '' &&  pokeType != '' ?
                                
                                <div className="radar_content">  
                                    <div className="container_img">
                                        <img src = {pokeImg} className="pokemon_img"></img>
                                    </div>
                                
                                    <div className="pokemonInfo">
                                        <h3 className="textInfoName">{String(pokeName)[0].toUpperCase() + String(pokeName).substr(1)}</h3>
                                        <h3 className="textInfo">Type: {pokeType}</h3>
                                        <h3 className="textInfo">Experience: {baseExperience}</h3>
                                    </div>
                                </div>

                                : <img src = {radar} className='load'></img>}
                            </div>
                        </div>

                        <div className="instructionGame">
                            <span className="instruction"> Utilize as setas do teclado para mover seu personagem e fique atento ao radar!</span>
                        </div>

                        <div className="catchPokemon">
                            <button className="catch" onClick={()=>catchPokemon()}> Catch Pokemon! </button>
                        </div>

                        <div className="voltarTelaMenu">
                            <button className="botaoVoltar" onClick={voltarMenu}>Voltar</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
       
);}

export default Game;