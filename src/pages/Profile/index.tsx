import { useState } from 'react';
import { FiUser, FiMail, FiMapPin, FiPhone, FiEdit2, FiSave, FiCreditCard } from 'react-icons/fi';
import * as S from './styles';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Dados sincronizados com a imagem da sua tabela 'users'
  const [userData, setUserData] = useState({
    name: 'Nome do Usuário',
    email: 'usuario@codewear.com.br',
    cpf: '123.456.789-00',
    phone: '',    // vindo do seu varchar(255)
    address: '',  // vindo do seu text
    password: ''  // apenas para quando quiser trocar
  });

  return (
    <S.Container>
      <S.Header>
        <div className="icon-bg"><FiUser /></div>
        <div>
          <h2>Meu Perfil</h2>
          <p>Dados da conta salvos no banco de dados</p>
        </div>
      </S.Header>

      <S.Content>
        <S.ProfileCard>
          <div className="card-header">
            <h3>Informações Cadastrais</h3>
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <><FiSave /> Salvar</> : <><FiEdit2 /> Editar</>}
            </button>
          </div>

          <S.InfoGroup>
            <div className="field">
              <label><FiUser size={14} /> Nome</label>
              {isEditing ? <input value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})} /> : <p>{userData.name}</p>}
            </div>

            <div className="field">
              <label><FiMail size={14} /> E-mail (Login)</label>
              <p style={{ color: '#64748b' }}>{userData.email}</p>
            </div>

            <div className="field">
              <label><FiCreditCard size={14} /> CPF</label>
              {isEditing ? <input value={userData.cpf} onChange={e => setUserData({...userData, cpf: e.target.value})} /> : <p>{userData.cpf}</p>}
            </div>

            <div className="field">
              <label><FiPhone size={14} /> Telefone (phone)</label>
              {isEditing ? <input value={userData.phone} onChange={e => setUserData({...userData, phone: e.target.value})} /> : <p>{userData.phone || 'Adicionar telefone'}</p>}
            </div>

            <div className="field" style={{ gridColumn: 'span 2' }}>
              <label><FiMapPin size={14} /> Endereço Completo (address)</label>
              {isEditing ? (
                <textarea rows={3} value={userData.address} onChange={e => setUserData({...userData, address: e.target.value})} placeholder="Rua, número, bairro, cidade..." />
              ) : (
                <p>{userData.address || 'Nenhum endereço cadastrado no banco.'}</p>
              )}
            </div>
          </S.InfoGroup>
        </S.ProfileCard>
      </S.Content>
    </S.Container>
  );
}