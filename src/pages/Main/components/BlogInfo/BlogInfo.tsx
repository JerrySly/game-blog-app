import { CommonProps } from "../../../../common/props";
import MyPhoto from 'assets/my-photo.png'
import './BlogInfo.scss';


export const BlogInfo = (props: CommonProps) => {
 return (
  <div className="info-block">
    <img className="info-block__img" src={MyPhoto} alt="фото автора" />
    <p className="info-block__text">Всем привет, меня зовут Евгений, а это мой блог. Здесь я собираюсь выкладывать небольшие статьи о вещах, 
     которые меня заинтерисовали. Основной темой скорее всего будет программирование, 
     но и другие темы иногда будут всплывать. Надеюсь каждый найдёт здесь что-нибудь почитать. Всех благ.</p>
  </div>
 )
} 