import { FiPhone, FiMapPin, FiInstagram, FiFacebook } from 'react-icons/fi';
import * as S from './styles';

export function Footer() {
  const instagramUrl = "https://www.instagram.com/grupointegrado/";
  const facebookUrl = "https://www.facebook.com/grupointegrado";
  const googleMapsUrl = "https://goo.gl/maps/xyz"; // Substitua pelo link real se desejar

  return (
    <S.Container>
      <S.ContentWrapper>
        <S.Content>
          {/* 1. Endereço e Telefone */}
          <S.Contact>
            <ul>
              <li><FiPhone size={14} /> <span>(44) 3518-2500</span></li>
              <li><FiMapPin size={14} /> <span>Av. Irmãos Pereira, 670 - Centro</span></li>
            </ul>
          </S.Contact>

          {/* 2. Botão do Mapa (Logo após o endereço) */}
          <S.MapSection>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <FiMapPin size={14} />
              <span>Ver no Mapa</span>
            </a>
          </S.MapSection>

          {/* 3. Redes Sociais (Após a divisória) */}
          <S.Social>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <FiInstagram size={20} />
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <FiFacebook size={20} />
            </a>
          </S.Social>
        </S.Content>

        {/* Linha de baixo: Copyright Centralizado */}
        <S.Copyright>
          <p>© 2026 CodeWear | Grupo Integrado. Todos os direitos reservados.</p>
        </S.Copyright>
      </S.ContentWrapper>
    </S.Container>
  );
}