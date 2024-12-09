CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Inserir categorias (se ainda não existirem)
INSERT INTO "category" ("name", "slug", "created_at", "updated_at") VALUES
  ('Eletrônicos', uuid_generate_v4(), NOW(), NOW()),
  ('Roupas', uuid_generate_v4(), NOW(), NOW()),
  ('Livros', uuid_generate_v4(), NOW(), NOW()),
  ('Móveis', uuid_generate_v4(), NOW(), NOW()),
  ('Jogos', uuid_generate_v4(), NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- Inserir marcas (se ainda não existirem)
INSERT INTO "brand" ("name", "slug", "created_at", "updated_at") VALUES
  ('Marca A', uuid_generate_v4(), NOW(), NOW()),
  ('Marca B', uuid_generate_v4(), NOW(), NOW()),
  ('Marca C', uuid_generate_v4(), NOW(), NOW()),
  ('Marca D', uuid_generate_v4(), NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;



INSERT INTO "product" ("name", "slug", "description", "price", "category_id", "brand_id") VALUES
-- Eletrônicos
  ('Smartphone XYZ', uuid_generate_v4(), 'Smartphone com tela de 6 polegadas e câmera de 48MP.', 1499.99, (SELECT category_id FROM "category" WHERE "name" = 'Eletrônicos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca A')),
  ('Fone de Ouvido Bluetooth', uuid_generate_v4(), 'Fone com cancelamento de ruído ativo.', 299.99, (SELECT category_id FROM "category" WHERE "name" = 'Eletrônicos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca B')),
  ('Notebook Ultrafino', uuid_generate_v4(), 'Notebook leve e potente com 16GB de RAM.', 4999.99, (SELECT category_id FROM "category" WHERE "name" = 'Eletrônicos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca C')),
  ('Câmera Digital Pro', uuid_generate_v4(), 'Câmera com qualidade profissional e zoom óptico de 20x.', 2599.99, (SELECT category_id FROM "category" WHERE "name" = 'Eletrônicos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca D')),
  ('Smartwatch Avançado', uuid_generate_v4(), 'Relógio inteligente com monitoramento de saúde.', 999.99, (SELECT category_id FROM "category" WHERE "name" = 'Eletrônicos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca A')),

-- Roupas
  ('Camiseta Básica', uuid_generate_v4(), 'Camiseta confortável de algodão.', 49.90, (SELECT category_id FROM "category" WHERE "name" = 'Roupas'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca B')),
  ('Calça Jeans Slim Fit', uuid_generate_v4(), 'Calça jeans com corte ajustado.', 99.90, (SELECT category_id FROM "category" WHERE "name" = 'Roupas'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca C')),
  ('Jaqueta de Couro', uuid_generate_v4(), 'Jaqueta estilosa de couro sintético.', 199.90, (SELECT category_id FROM "category" WHERE "name" = 'Roupas'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca D')),
  ('Tênis Esportivo', uuid_generate_v4(), 'Tênis leve e confortável para corridas.', 249.99, (SELECT category_id FROM "category" WHERE "name" = 'Roupas'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca A')),
  ('Vestido de Verão', uuid_generate_v4(), 'Vestido leve e colorido para dias quentes.', 129.99, (SELECT category_id FROM "category" WHERE "name" = 'Roupas'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca B')),

-- Livros
  ('Livro: Aprendendo SQL', uuid_generate_v4(), 'Guia prático para dominar SQL.', 89.90, (SELECT category_id FROM "category" WHERE "name" = 'Livros'), NULL),
  ('Livro: Programação em Python', uuid_generate_v4(), 'Aprenda Python do básico ao avançado.', 99.90, (SELECT category_id FROM "category" WHERE "name" = 'Livros'), NULL),
  ('Livro: Gestão Empresarial', uuid_generate_v4(), 'Estratégias de sucesso na gestão de empresas.', 79.90, (SELECT category_id FROM "category" WHERE "name" = 'Livros'), NULL),
  ('Livro: Design de Interfaces', uuid_generate_v4(), 'Guia de design para experiências digitais.', 119.99, (SELECT category_id FROM "category" WHERE "name" = 'Livros'), NULL),
  ('Livro: História Mundial', uuid_generate_v4(), 'Uma jornada pela história das civilizações.', 159.99, (SELECT category_id FROM "category" WHERE "name" = 'Livros'), NULL),

-- Móveis
  ('Mesa de Escritório', uuid_generate_v4(), 'Mesa ampla com acabamento de madeira.', 899.99, (SELECT category_id FROM "category" WHERE "name" = 'Móveis'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca C')),
  ('Cadeira Gamer', uuid_generate_v4(), 'Cadeira ergonômica para jogos e trabalho.', 1299.99, (SELECT category_id FROM "category" WHERE "name" = 'Móveis'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca A')),
  ('Estante de Livros', uuid_generate_v4(), 'Estante compacta e moderna para livros.', 499.99, (SELECT category_id FROM "category" WHERE "name" = 'Móveis'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca B')),
  ('Sofá Retrátil', uuid_generate_v4(), 'Sofá confortável com reclinação.', 2499.99, (SELECT category_id FROM "category" WHERE "name" = 'Móveis'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca D')),
  ('Guarda-Roupa 3 Portas', uuid_generate_v4(), 'Guarda-roupa espaçoso com espelho.', 1999.99, (SELECT category_id FROM "category" WHERE "name" = 'Móveis'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca C')),

-- Jogos
  ('Console de Video Game', uuid_generate_v4(), 'Console de última geração com suporte a 4K.', 2999.99, (SELECT category_id FROM "category" WHERE "name" = 'Jogos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca A')),
  ('Jogo de Tabuleiro Clássico', uuid_generate_v4(), 'Diversão para toda a família.', 149.99, (SELECT category_id FROM "category" WHERE "name" = 'Jogos'), NULL),
  ('Controle Sem Fio', uuid_generate_v4(), 'Controle ergonômico para consoles.', 299.99, (SELECT category_id FROM "category" WHERE "name" = 'Jogos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca B')),
  ('Volante para Jogos', uuid_generate_v4(), 'Simulação realista para corridas.', 699.99, (SELECT category_id FROM "category" WHERE "name" = 'Jogos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca C')),
  ('Headset Gamer', uuid_generate_v4(), 'Fone com som surround para jogos.', 399.99, (SELECT category_id FROM "category" WHERE "name" = 'Jogos'), (SELECT brand_id FROM "brand" WHERE "name" = 'Marca D'));

-- Continue adicionando produtos semelhantes para completar 50
