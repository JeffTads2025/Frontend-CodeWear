import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { productsApi, usersApi, cartApi, ordersApi, auditApi } from '../../services/api';
import { maskCPF, sanitizeCPF, validateCPF } from '../../utils/cpf';
import type {
    ApiErrorResponse,
    AuditLogEntry,
    CartEntry,
    OrderSummary,
    Product,
    ProductsListResponse,
    ProductUpdateInput,
    UserProfile,
    UserUpdateInput,
} from '../../types/api';
import * as S from './styles';

function isProductsListResponse(value: Product[] | ProductsListResponse): value is ProductsListResponse {
    return !Array.isArray(value);
}

type ApiDemoDataItem = Product | UserProfile | CartEntry | OrderSummary | AuditLogEntry;

type ApiErrorCandidate = Error | { response?: { data?: ApiErrorResponse } } | null | undefined;

function getErrorMessage(error: ApiErrorCandidate, fallback: string): string {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return error.response?.data?.message || fallback;
    }

    return fallback;
}

export function ApiDemo() {
    const { updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState<'products' | 'users' | 'cart' | 'orders' | 'audit'>('products');
    const [data, setData] = useState<ApiDemoDataItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Estados para inputs dos forms
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        description: '',
        stock: '',
        image_url: ''
    });
    const [updateProductId, setUpdateProductId] = useState('');
    const [deleteProductId, setDeleteProductId] = useState('');
    const [cartForm, setCartForm] = useState({
        productId: '',
        quantity: ''
    });
    const [userForm, setUserForm] = useState({
        name: '',
        email: '',
        password: '',
        cpf: '',
        phone: '',
        address: ''
    });
    const [profileForm, setProfileForm] = useState({
        name: '',
        phone: '',
        address: '',
        password: ''
    });

    // ==================== VALIDAÇÕES E MÁSCARAS ====================
    const maskPhone = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d{1,4})/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // ==================== PRODUCTS CRUD DEMO ====================
    const loadProducts = async () => {
        setLoading(true);
        try {
            const result = await productsApi.getAll({ limit: 5 });
            setData(isProductsListResponse(result) ? result.products : result);
            toast.success('✅ Produtos carregados com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar produtos')}`);
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async () => {
        if (!productForm.name || !productForm.price || !productForm.stock) {
            toast.error('❌ Preencha pelo menos Nome, Preço e Estoque!');
            return;
        }

        try {
            const newProduct = {
                name: productForm.name,
                price: parseFloat(productForm.price),
                description: productForm.description || 'Produto criado via API Demo',
                image_url: productForm.image_url || 'https://via.placeholder.com/200',
                stock: parseInt(productForm.stock)
            };
            await productsApi.create(newProduct);
            toast.success('✅ Produto criado com sucesso!');
            loadProducts();
            // Limpar form
            setProductForm({ name: '', price: '', description: '', stock: '', image_url: '' });
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao criar produto')}`);
        }
    };

    const updateProduct = async () => {
        if (!updateProductId) {
            toast.error('❌ Digite o ID do produto a ser atualizado!');
            return;
        }

        try {
            const updateData: ProductUpdateInput = {};
            if (productForm.name) updateData.name = productForm.name;
            if (productForm.price) updateData.price = parseFloat(productForm.price);
            if (productForm.description) updateData.description = productForm.description;
            if (productForm.stock) updateData.stock = parseInt(productForm.stock);
            if (productForm.image_url) updateData.image_url = productForm.image_url;

            if (Object.keys(updateData).length === 0) {
                toast.error('❌ Preencha pelo menos um campo para atualizar!');
                return;
            }

            await productsApi.update(parseInt(updateProductId), updateData);
            toast.success('✅ Produto atualizado com sucesso!');
            loadProducts();
            setUpdateProductId('');
            setProductForm({ name: '', price: '', description: '', stock: '', image_url: '' });
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao atualizar produto')}`);
        }
    };

    const deleteProduct = async () => {
        if (!deleteProductId) {
            toast.error('❌ Digite o ID do produto a ser deletado!');
            return;
        }

        if (!confirm('Tem certeza que deseja deletar este produto?')) return;
        try {
            await productsApi.delete(parseInt(deleteProductId));
            toast.success('✅ Produto deletado com sucesso!');
            loadProducts();
            setDeleteProductId('');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao deletar produto')}`);
        }
    };

    // ==================== USERS CRUD DEMO ====================
    const loadUsers = async () => {
        setLoading(true);
        try {
            const result = await usersApi.getAll({ limit: 5 });
            setData(result.users);
            toast.success('✅ Usuários carregados com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar usuários')}`);
        } finally {
            setLoading(false);
        }
    };

    const loadProfile = async () => {
        try {
            const result = await usersApi.getProfile();
            setData([result]);
            toast.success('✅ Perfil carregado com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar perfil')}`);
        }
    };

    const createUser = async () => {
        if (!userForm.name || !userForm.email || !userForm.password || !userForm.cpf || !userForm.phone || !userForm.address) {
            toast.error('❌ Preencha todos os campos obrigatórios!');
            return;
        }

        // Validações
        if (!validateEmail(userForm.email)) {
            toast.error('❌ E-mail inválido!');
            return;
        }

        if (!validateCPF(userForm.cpf)) {
            toast.error('❌ CPF inválido!');
            return;
        }

        if (userForm.password.length < 8) {
            toast.error('❌ Senha deve ter pelo menos 8 caracteres!');
            return;
        }

        try {
            const cleanCPF = sanitizeCPF(userForm.cpf);
            const cleanPhone = userForm.phone.replace(/\D/g, '');

            await usersApi.create({
                ...userForm,
                cpf: cleanCPF,
                phone: cleanPhone
            });
            toast.success('✅ Usuário criado com sucesso!');
            setUserForm({ name: '', email: '', password: '', cpf: '', phone: '', address: '' });
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao criar usuário')}`);
        }
    };

    const updateProfile = async () => {
        if (!profileForm.name && !profileForm.phone && !profileForm.address && !profileForm.password) {
            toast.error('❌ Preencha pelo menos um campo para atualizar!');
            return;
        }

        // Validações se campos foram preenchidos
        if (profileForm.phone && profileForm.phone.replace(/\D/g, '').length < 10) {
            toast.error('❌ Telefone deve ter pelo menos 10 dígitos!');
            return;
        }

        if (profileForm.password && profileForm.password.length < 8) {
            toast.error('❌ Nova senha deve ter pelo menos 8 caracteres!');
            return;
        }

        try {
            const updateData: UserUpdateInput = {};
            if (profileForm.name) updateData.name = profileForm.name;
            if (profileForm.phone) updateData.phone = profileForm.phone.replace(/\D/g, '');
            if (profileForm.address) updateData.address = profileForm.address;
            if (profileForm.password) updateData.password = profileForm.password;

            await usersApi.updateProfile(updateData);

            // Busca o perfil atualizado e atualiza o localStorage
            const refreshedUser = await usersApi.getProfile();
            updateUser(refreshedUser);

            toast.success('✅ Perfil atualizado com sucesso!');
            loadProfile();
            setProfileForm({ name: '', phone: '', address: '', password: '' });
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao atualizar perfil')}`);
        }
    };

    // ==================== CART CRUD DEMO ====================
    const loadCart = async () => {
        setLoading(true);
        try {
            const result = await cartApi.getAll();
            setData(result);
            toast.success('✅ Carrinho carregado com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar carrinho')}`);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async () => {
        if (!cartForm.productId || !cartForm.quantity) {
            toast.error('❌ Preencha o ID do produto e a quantidade!');
            return;
        }

        try {
            await cartApi.addItem({
                productId: parseInt(cartForm.productId),
                quantity: parseInt(cartForm.quantity)
            });
            toast.success('✅ Item adicionado ao carrinho!');
            loadCart();
            setCartForm({ productId: '', quantity: '' });
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao adicionar item')}`);
        }
    };

    const clearCart = async () => {
        if (!confirm('Tem certeza que deseja limpar o carrinho?')) return;
        try {
            await cartApi.clear();
            toast.success('✅ Carrinho limpo com sucesso!');
            loadCart();
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao limpar carrinho')}`);
        }
    };

    // ==================== ORDERS CRUD DEMO ====================
    const loadMyOrders = async () => {
        setLoading(true);
        try {
            const result = await ordersApi.getMyOrders();
            setData(result.orders);
            toast.success('✅ Pedidos carregados com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar pedidos')}`);
        } finally {
            setLoading(false);
        }
    };

    const loadAllOrders = async () => {
        setLoading(true);
        try {
            const result = await ordersApi.getAll({ limit: 5 });
            setData(result.orders);
            toast.success('✅ Todos os pedidos carregados com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar pedidos')}`);
        } finally {
            setLoading(false);
        }
    };

    // ==================== AUDIT CRUD DEMO ====================
    const loadAuditLogs = async () => {
        setLoading(true);
        try {
            const result = await auditApi.getLogs({ limit: 5 });
            setData(result.logs);
            toast.success('✅ Logs de auditoria carregados com sucesso!');
        } catch (error) {
            toast.error(`❌ Erro: ${getErrorMessage(error as ApiErrorCandidate, 'Erro ao carregar logs')}`);
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab: typeof activeTab) => {
        setActiveTab(tab);
        setData([]);
    };

    const renderData = () => {
        if (loading) return <div>Carregando...</div>;
        if (!data.length) return <div>Nenhum dado encontrado. Clique em uma ação para carregar dados.</div>;

        return (
            <div style={{ marginTop: '20px' }}>
                <h3>Dados Carregados ({data.length} itens):</h3>
                <pre style={{
                    background: '#1a1a1a',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '400px'
                }}>
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        );
    };

    return (
        <S.Container>
            <S.Header>
                <div className="icon-bg">🔧</div>
                <div>
                    <h2>API CRUD Demo</h2>
                    <p>Demonstração dos CRUDS implementados no service api.ts</p>
                </div>
            </S.Header>

            <S.Content>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    {[
                        { key: 'products', label: '📦 Produtos', color: '#ffcc00' },
                        { key: 'users', label: '👥 Usuários', color: '#3b82f6' },
                        { key: 'cart', label: '🛒 Carrinho', color: '#10b981' },
                        { key: 'orders', label: '📋 Pedidos', color: '#f59e0b' },
                        { key: 'audit', label: '📊 Auditoria', color: '#ef4444' }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => handleTabChange(tab.key as typeof activeTab)}
                            style={{
                                padding: '10px 15px',
                                background: activeTab === tab.key ? tab.color : '#333',
                                color: activeTab === tab.key ? '#000' : '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ marginBottom: '20px' }}>
                    {activeTab === 'products' && (
                        <div>
                            {/* Form para Criar Produto */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
                                <h4 style={{ color: '#10b981', marginBottom: '10px' }}>➕ Criar Novo Produto</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Nome do produto"
                                        value={productForm.name}
                                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Preço (R$)"
                                        value={productForm.price}
                                        onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Estoque"
                                        value={productForm.stock}
                                        onChange={e => setProductForm({ ...productForm, stock: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Descrição"
                                        value={productForm.description}
                                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL da imagem"
                                        value={productForm.image_url}
                                        onChange={e => setProductForm({ ...productForm, image_url: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <Button onClick={createProduct} style={{ background: '#10b981' }}>➕ Criar Produto</Button>
                            </div>

                            {/* Form para Atualizar Produto */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
                                <h4 style={{ color: '#f59e0b', marginBottom: '10px' }}>✏️ Atualizar Produto</h4>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <input
                                        type="number"
                                        placeholder="ID do produto"
                                        value={updateProductId}
                                        onChange={e => setUpdateProductId(e.target.value)}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff', width: '120px' }}
                                    />
                                    <span style={{ color: '#888' }}>← Digite o ID primeiro</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Novo nome (opcional)"
                                        value={productForm.name}
                                        onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Novo preço (opcional)"
                                        value={productForm.price}
                                        onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Novo estoque (opcional)"
                                        value={productForm.stock}
                                        onChange={e => setProductForm({ ...productForm, stock: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Nova descrição (opcional)"
                                        value={productForm.description}
                                        onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nova URL da imagem (opcional)"
                                        value={productForm.image_url}
                                        onChange={e => setProductForm({ ...productForm, image_url: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <Button onClick={updateProduct} style={{ background: '#f59e0b' }}>✏️ Atualizar Produto</Button>
                            </div>

                            {/* Form para Deletar Produto */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
                                <h4 style={{ color: '#ef4444', marginBottom: '10px' }}>🗑️ Deletar Produto</h4>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <input
                                        type="number"
                                        placeholder="ID do produto"
                                        value={deleteProductId}
                                        onChange={e => setDeleteProductId(e.target.value)}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff', width: '120px' }}
                                    />
                                </div>
                                <Button onClick={deleteProduct} style={{ background: '#ef4444' }}>🗑️ Deletar Produto</Button>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <Button onClick={loadProducts}>📖 Listar Produtos</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div>
                            {/* Form para Cadastrar Usuário */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
                                <h4 style={{ color: '#10b981', marginBottom: '10px' }}>➕ Cadastrar Novo Usuário</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Nome completo"
                                        value={userForm.name}
                                        onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="E-mail"
                                        value={userForm.email}
                                        onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Senha"
                                        value={userForm.password}
                                        onChange={e => setUserForm({ ...userForm, password: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="CPF (000.000.000-00)"
                                        value={userForm.cpf}
                                        onChange={e => setUserForm({ ...userForm, cpf: maskCPF(e.target.value) })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Telefone ((00) 00000-0000)"
                                        value={userForm.phone}
                                        onChange={e => setUserForm({ ...userForm, phone: maskPhone(e.target.value) })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Endereço completo"
                                        value={userForm.address}
                                        onChange={e => setUserForm({ ...userForm, address: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <Button onClick={createUser} style={{ background: '#10b981' }}>➕ Cadastrar Usuário</Button>
                            </div>

                            {/* Form para Atualizar Perfil */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
                                <h4 style={{ color: '#f59e0b', marginBottom: '10px' }}>✏️ Atualizar Meu Perfil</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
                                    <input
                                        type="text"
                                        placeholder="Novo nome (opcional)"
                                        value={profileForm.name}
                                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Novo telefone (opcional) ((00) 00000-0000)"
                                        value={profileForm.phone}
                                        onChange={e => setProfileForm({ ...profileForm, phone: maskPhone(e.target.value) })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Nova senha (opcional)"
                                        value={profileForm.password}
                                        onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff' }}
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <textarea
                                        placeholder="Novo endereço (opcional)"
                                        value={profileForm.address}
                                        onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                                        rows={2}
                                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff', resize: 'vertical' }}
                                    />
                                </div>
                                <Button onClick={updateProfile} style={{ background: '#f59e0b' }}>✏️ Atualizar Perfil</Button>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <Button onClick={loadUsers}>📖 Listar Usuários</Button>
                                <Button onClick={loadProfile} style={{ background: '#3b82f6' }}>👤 Meu Perfil</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'cart' && (
                        <div>
                            {/* Form para Adicionar ao Carrinho */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
                                <h4 style={{ color: '#10b981', marginBottom: '10px' }}>➕ Adicionar Item ao Carrinho</h4>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <input
                                        type="number"
                                        placeholder="ID do produto"
                                        value={cartForm.productId}
                                        onChange={e => setCartForm({ ...cartForm, productId: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff', width: '120px' }}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Quantidade"
                                        value={cartForm.quantity}
                                        onChange={e => setCartForm({ ...cartForm, quantity: e.target.value })}
                                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #333', background: '#0a0a0a', color: '#fff', width: '100px' }}
                                    />
                                </div>
                                <Button onClick={addToCart} style={{ background: '#10b981' }}>➕ Adicionar Item</Button>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <Button onClick={loadCart}>📖 Ver Carrinho</Button>
                                <Button onClick={clearCart} style={{ background: '#ef4444' }}>🗑️ Limpar Carrinho</Button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'orders' && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <Button onClick={loadMyOrders}>📖 Meus Pedidos</Button>
                            <Button onClick={loadAllOrders} style={{ background: '#f59e0b' }}>📊 Todos os Pedidos</Button>
                        </div>
                    )}

                    {activeTab === 'audit' && (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <Button onClick={loadAuditLogs}>📊 Ver Logs</Button>
                        </div>
                    )}
                </div>

                {/* Data Display */}
                {renderData()}
            </S.Content>
        </S.Container>
    );
}