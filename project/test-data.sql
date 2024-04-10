ALTER DATABASE scenarios_and_lexicons CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Inserindo Projetos
INSERT INTO project (id, name, description) VALUES
  (1, 'Projeto Plataforma de Petróleo', 'Um projeto focado no desenvolvimento de uma plataforma de petróleo sustentável.');

-- Inserindo Símbolos
INSERT INTO symbol (id, name, classification, notion, project_id) VALUES
  (1, 'Operador da Plataforma', 'Ator', NULL, 1),
  (2, 'Oficial de Conformidade Ambiental', 'Ator', NULL, 1),
  (3, 'Reservas de Petróleo', 'Recurso', NULL, 1),
  (4, 'Equipamento de Monitoramento Ambiental', 'Recurso', NULL, 1),
  (5, 'Plataforma', 'Objeto', NULL, 1),
  (6, 'Regulamentações ambientais', 'Recurso', NULL, 1),
  (7, 'Dia Atual', 'Estado', NULL, 1),
  (8, 'Local Offshore', 'Estado', NULL, 1),
  (9, 'Durante Incidente', 'Estado', NULL, 1),
  (10, 'Local Costeiro', 'Estado', NULL, 1);
  -- Adicione mais símbolos conforme necessário

-- Inserindo Impactos
INSERT INTO impact (description, symbol_id) VALUES
  ('Impacto na Qualidade do Ar', 1),
  ('Impacto nos Recursos Hídricos', 1);
  -- Adicione mais impactos conforme necessário

-- Inserindo Sinônimos
INSERT INTO synonym (name, symbol_id) VALUES
  ('Emissões', 1),
  ('Contaminação da Água', 1);
  -- Adicione mais sinônimos conforme necessário

-- Inserindo Cenários
INSERT INTO scenario (id, title, goal, project_id) VALUES
  (1, 'Implantação da Plataforma', 'Implantar a plataforma de petróleo em conformidade com as regulamentações ambientais.', 1),
  (2, 'Resposta a Emergências', 'Lidar e mitigar incidentes ambientais durante as operações e implantação da plataforma.', 1);
  -- Adicione mais cenários conforme necessário

-- Inserindo Atores
INSERT INTO actor (id, name) VALUES
  (1, 'Operador da Plataforma'),
  (2, 'Oficial de Conformidade Ambiental');
  -- Adicione mais atores conforme necessário

INSERT INTO scenario_actor (scenario_id, actor_id) VALUES
    (1, 1),
    (1, 2);

-- Inserindo Recursos
INSERT INTO resource (id, name) VALUES
  (1, 'Reservas de Petróleo'),
  (2, 'Equipamento de Monitoramento Ambiental');
  -- Adicione mais recursos conforme necessário

INSERT INTO scenario_resource (scenario_id, resource_id) VALUES
    (1, 1),
    (1, 2);

-- Inserindo Contextos
INSERT INTO context (id, pre_condition, temporal_location, geographic_location, scenario_id) VALUES
  (1, 'Avaliação de Impacto Ambiental Concluída', 'Dia Atual', 'Local Offshore', 1),
  (2, 'Plano de Resposta a Emergências Ativado', 'Durante Incidente', 'Local Costeiro', 2);
  -- Adicione mais contextos conforme necessário

-- Inserindo Episódios
INSERT INTO episode (id, position, description, type, scenario_id) VALUES
  (1, 1, 'Inicialização da Plataforma', 'Configuração', 1),
  (2, 2, 'Resposta a Derramamento de Óleo', 'Emergência', 1);
  -- Adicione mais episódios conforme necessário

-- Inserindo Exceções
INSERT INTO exception (description, scenario_id) VALUES
  ('Atraso na Implantação da Plataforma', 1),
  ('Resposta a Emergência Ineficaz', 1);
  -- Adicione mais exceções conforme necessário

-- Inserindo Grupos
INSERT INTO scenarios_and_lexicons.group (id, position, scenario_id) VALUES
  (1, 3, 1),
  (2, 4, 1);
  -- Adicione mais grupos conforme necessário

-- Inserindo Episódios Não Sequenciais
INSERT INTO non_sequential_episode (id, position, description, type, group_id) VALUES
  (1, 1, 'Revisão da Avaliação de Impacto Ambiental', 'Avaliação', 1),
  (2, 2, 'Medidas de Proteção à Fauna', 'Precaução', 1);
  -- Adicione mais episódios não sequenciais conforme necessário

-- Inserindo Restrições
INSERT INTO restriction (description, context_id, resource_id, episode_id) VALUES
  ("Ativar Plano de Resposta a Emergências", 1, 1, 1),
  ("Ativar Plano de Resposta a Derramamento de Óleo", 1, 1, 2);
  -- Adicione mais restrições conforme necessário
