

-- Criando tabelas dos produtos


CREATE TABLE categorias(
	idCategoria SERIAL,
	categoria VARCHAR(150) UNIQUE NOT NULL,
	sigla VARCHAR(3)UNIQUE NOT NULL,
	PRIMARY KEY(idCategoria)
)

CREATE TABLE produtos (
	idProduto SERIAL,
	produto VARCHAR(255) NOT NULL,
	idCategoria INTEGER NOT NULL,
	PRIMARY KEY(idProduto)
);

ALTER TABLE produtos ADD CONSTRAINT FK_Produto_Categoria
FOREIGN KEY (idCategoria) REFERENCES categorias(idCategoria);

CREATE TABLE sit_produtos (
	idSituacao SERIAL,
	dataSituacao TIMESTAMP NOT NULL,
	preco NUMERIC(5,2) NOT NULL,
	idProduto INTEGER,
	PRIMARY KEY(idSituacao)
);

ALTER TABLE sit_produtos ADD CONSTRAINT FK_SitProduto_Produto
FOREIGN KEY (idProduto) REFERENCES produtos(idProduto);

CREATE TABLE ingredientes (
	idIngrediente SERIAL,
	ingrediente VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(idIngrediente)
);

CREATE TABLE ingrediente_produto (
	idProduto INTEGER,
	idIngrediente INTEGER,
	PRIMARY KEY(idProduto, idIngrediente)
)

ALTER TABLE ingrediente_produto ADD CONSTRAINT FK_IngredienteProduto_Produto
FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)

ALTER TABLE ingrediente_produto ADD CONSTRAINT FK_IngredienteProduto_Ingrediente
FOREIGN KEY (idIngrediente) REFERENCES ingredientes(idIngrediente)


-- Criando tabelas dos kits


CREATE TABLE kits (
	idKit SERIAL,
	kit VARCHAR(150),
	PRIMARY KEY(idKit)
);

CREATE TABLE sit_kits (
	idSituacao SERIAL,
	dataSituacao DATE NOT NULL,
	preco NUMERIC(5,2) NOT NULL,
	idKit INTEGER,
	PRIMARY KEY(idSituacao)
);

ALTER TABLE sit_kits ADD CONSTRAINT FK_SitKit_Kit
FOREIGN KEY (idKit) REFERENCES kits(idKit)

CREATE TABLE produtos_Kit (
	idKit INTEGER NOT NULL,
	idProduto INTEGER NOT NULL,
	qtde INTEGER NOT NULL,
	PRIMARY KEY(idKit, idProduto)
);

ALTER TABLE produtos_kit ADD CONSTRAINT FK_ProdutosKit_Kit
FOREIGN KEY (idKit) REFERENCES kits(idKit)

ALTER TABLE produtos_kit ADD CONSTRAINT FK_ProdutosKit_Produto
FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)


-- Criando tabelas complementares para o pedido


CREATE TABLE atendentes (
	idAtendente SERIAL,
	atendente VARCHAR(255) NOT NULL,
	dataCadastro TIMESTAMP NOT NULL,
	PRIMARY KEY(idAtendente)
)

CREATE TABLE statusPedido (
	idStatus SERIAL,
	status VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(idStatus)
)

CREATE TABLE tiposPedido (
	idTipo SERIAL,
	tipo VARCHAR(150) UNIQUE NOT NULL,
	PRIMARY KEY(idTipo)
)

CREATE TABLE entregadores (
	idEntregador SERIAL,
	entregador VARCHAR(255) NOT NULL,
	dataCadastro TIMESTAMP NOT NULL,
	PRIMARY KEY(idEntregador)
);


-- Criando tabelas de informacoes dos clientes


CREATE TABLE bairros (
	idBairro SERIAL,
	bairro VARCHAR(200) UNIQUE NOT NULL,
	taxaEntrega NUMERIC(4,2) NOT NULL,
	PRIMARY KEY(idBairro)
);

CREATE TABLE clientes (
	idCliente SERIAL,
	cliente VARCHAR(255) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
	endereco VARCHAR(255),
	numero VARCHAR(15),
	idBairro INTEGER,
	dataCadastro TIMESTAMP NOT NULL,
	dataAtualizacao TIMESTAMP,
	sexo CHAR(1) CHECK (sexo IN ('M', 'F')),
	dtNascimento DATE,
	PRIMARY KEY(idCliente)
);

ALTER TABLE clientes ADD CONSTRAINT FK_cliente_bairro
FOREIGN KEY (idBairro) REFERENCES bairros(idBairro)


-- Criando tabelas dos pedidos


CREATE TABLE pedidos (
	idPedido SERIAL,
	idCliente INTEGER  NOT NULL,
	dataPedido TIMESTAMP NOT NULL,
	idStatus INTEGER NOT NULL,
	idAtendente INTEGER NOT NULL,
	idEntregador INTEGER,
	idTipo INTEGER NOT NULL,
	desconto NUMERIC(5,2) NOT NULL,
	taxaEntrega NUMERIC(4,2) NOT NULL,
	endereco VARCHAR(255) NOT NULL,
	numero VARCHAR(5) NOT NULL,
	idBairro INTEGER NOT NULL,
	obs VARCHAR(500),
	PRIMARY KEY(idPedido)
);


ALTER TABLE pedidos ADD CONSTRAINT FK_pedido_cliente
FOREIGN KEY (idCliente) REFERENCES clientes(idCliente)

ALTER TABLE pedidos ADD CONSTRAINT FK_pedido_status
FOREIGN KEY (idStatus) REFERENCES statusPedido(idStatus)

ALTER TABLE pedidos ADD CONSTRAINT FK_pedido_atendente
FOREIGN KEY (idAtendente) REFERENCES atendentes(idAtendente)

ALTER TABLE pedidos ADD CONSTRAINT FK_pedido_entregador
FOREIGN KEY (idEntregador) REFERENCES entregadores(idEntregador)

ALTER TABLE pedidos ADD CONSTRAINT FK_pedido_tipo
FOREIGN KEY (idTipo) REFERENCES tiposPedido(idTipo)

ALTER TABLE pedidos ADD CONSTRAINT FK_pedido_bairro
FOREIGN KEY (idBairro) REFERENCES bairros(idBairro)


CREATE TABLE item_pedido (
	idItem SERIAL,
	idPedido INTEGER NOT NULL,
	idProduto INTEGER,
	idKit INTEGER,	
	idAdicional INTEGER,
	qtde INTEGER NOT NULL,
	valorUnitario NUMERIC(5,2) NOT NULL,
	valorTotal NUMERIC(6,2) NOT NULL,
	obs VARCHAR(500),
	PRIMARY KEY(idItem)
);


ALTER TABLE item_pedido ADD CONSTRAINT FK_itemPedido_pedido
FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido)

ALTER TABLE item_pedido ADD CONSTRAINT FK_itemPedido_produto
FOREIGN KEY (idProduto) REFERENCES produtos(idProduto)

ALTER TABLE item_pedido ADD CONSTRAINT FK_itemPedido_kit
FOREIGN KEY (idKit) REFERENCES kits(idKit)

ALTER TABLE item_pedido ADD CONSTRAINT FK_itemPedido_adicional
FOREIGN KEY (idadicional) REFERENCES adicional_pedido(idadicionalpedido)

ALTER TABLE item_pedido ADD CONSTRAINT FK_itemPedido_borda
FOREIGN KEY (idborda) REFERENCES bordas(idborda)


CREATE TABLE adicionaisItens (
	idadicional SERIAL,
	adicional VARCHAR(100) UNIQUE NOT NULL,
	vl_pizza NUMERIC(4,2),
	vl_esfiha NUMERIC(4,2),
	vl_beirute NUMERIC(4,2),
	vl_pastel NUMERIC(4,2),
	vl_geral NUMERIC(4,2),
	
	PRIMARY KEY(idadicional)
) 

CREATE TABLE adicional_pedido (
	idadicionalpedido SERIAL,
	idadicional INT NOT NULL,
	idproduto INT,
	idcategoria INT,
	
	PRIMARY KEY (idadicionalpedido)
)

CREATE TABLE bordas(
	idborda SERIAL,
	borda VARCHAR(25) NOT NULL,
	valor NUMERIC(4,2) NOT NULL,
	PRIMARY KEY(idborda)
)

ALTER TABLE adicional_pedido ADD CONSTRAINT Fk_adicionalpedido_adicional
FOREIGN KEY (idadicional) REFERENCES adicionaisItens(idadicional)

ALTER TABLE adicional_pedido ADD CONSTRAINT Fk_adicionalpedido_produto
FOREIGN KEY (idproduto) REFERENCES produtos(idproduto)

ALTER TABLE adicional_pedido ADD CONSTRAINT Fk_adicionalpedido_categoria
FOREIGN KEY (idcategoria) REFERENCES categorias(idcategoria)







