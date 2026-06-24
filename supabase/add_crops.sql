INSERT INTO crops (key_name) VALUES
('banana'),
('mango'),
('coconut'),
('onion'),
('potato'),
('tomato'),
('tea'),
('coffee'),
('mustard'),
('sesame'),
('gram'),
('barley'),
('moong'),
('urad'),
('masoor'),
('tapioca')
ON CONFLICT (key_name) DO NOTHING;
