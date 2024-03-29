

import axios from 'axios';
import React, {useState} from 'react'
import Header from "../../components/header/Header";
import { ImgDiv, MainContainer,HomeImg } from './HomeStyles';
import homeSvg from '../../assets/home.svg'
import RecipeCardComp from "./RecipeCardComp"


const APP_ID = "c89986f5"; 
const APP_KEY = "c880cb8431accb4070b0676bd3d3a635";
/****buraya kendi id ve key imizi yaziyoruz**********/
//const APP_ID = "bfbb3efc"; //bfbb3efc;const APP_KEY = "43faeee790f26cd82b28050d3031619d";// 43faeee790f26cd82b28050d3031619d

const Home = () => {
  const [query, setQuery] = useState("");
  const [food, setFood] = useState();
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack", "Teatime"];
  const [meal, setMeal] = useState(mealTypes[0].toLowerCase());

  // query=yazdığımız sorgu kelimesi, meal=breakfast vs
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&mealType=${meal}`;

  //   Async/await i daha güzel yapan ancak işlevsellikte hiçbir değişikliği olmayan bir kod bükümüdür.crud işlemlerini kolaylaştırır. Birkaç iyi nedenden dolayı söz zinciri (then) yerine async/await kullanılması önerilir:
  // Mevcut iş parçacığına zarar vermez,
  // Söz zincirleme ile karşılaştırıldığında CPU'da fazla maliyeti yoktur ,
  // Senkronizeymiş gibi kod yazmanıza yardımcı olur,

  // await tek başına kullanılması bir sözdizimi hatası üretecektir. Bu nedenle, async işlevinin içinde await kullanın,
  //url ye bağlandığınızda then ile devam ederseniz ok, ama kısaca axios kullanacaksak, veri çekerken beklemeyip alt satıra geçer, o yüzden bekle await diyoruz
  const getData = async () => {
    if (query) {
      const result = await axios.get(url);
      setFood(result.data.hits);
      console.log(result.data.hits);
      //sadece result ı yazdırırsak bir sürü yabancı ifade gelecek, bizim esas istediğimiz data dizisi, result ın bir alt öğesi, dataya ulaşmak için result.data
      // data nın içinde hits ve more key i var, hits =bütün dizi toplu halde json olarak, 10 tane pie mesela. data 1 den 10 a kadar göster diyor, (daha fazla varsa bile ) more =true
    } else {
      console.log("please fill the form");
    }
  };

  return (
    <div>
      {/* alttakileri header a oradan da form a gönderiyorum, orada setMeal ve setQuery çalışacak setter a gönderiyorum yani */}
      {/* componente gidecekse tek kelime, style a gidecekse aç kapa 2 kelime */}
      <Header
        setQuery={setQuery}
        getData={getData}
        mealTypes={mealTypes}
        setMeal={setMeal}
        // meal={meal}
        //meal = breakfast mesela. mealTypes= bütün hepsi, breakfast, lunch....
      />

      {food ? (
        // api den gelen datanın tümü, (bir yiyecek ismi girildiğinde)
        <MainContainer>
          {/* arama sonucu yiyecek kartlarının kutusu */}
          {food.map((liste, index) => (
            <RecipeCardComp key={index} recipe1={liste.recipe} />
            // sadece liste yollarsak apı deki gibi  gidiyor. liste.recipe= json formatında key value. kısaca{recipe}.hits in içinde recipe var, liste hits e kadar gelir ben içindeki recipe'yi istiyorum
            // veriler direk bu sayfaya geliyor ,RecipeCardComp deki gibi navigate state e gerek yok
          ))}
        </MainContainer>
      ) : (
        <ImgDiv>
          <HomeImg src={homeSvg} />

          {/* ekrandaki aşçı resmi */}
        </ImgDiv>
      )}
    </div>
  );
}

export default Home
