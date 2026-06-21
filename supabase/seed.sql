-- Districts moved to all_districts.sql (765 districts)
-- Crops (8 master entries)
INSERT INTO crops (key_name) VALUES
('cotton'),
('soybean'),
('groundnut'),
('jowar'),
('bajra'),
('tur'),
('chili'),
('sugarcane'),
('grapes'),
('pomegranate'),
('maize'),
('sunflower'),
('wheat'),
('rice');

-- Pests (5 core profiles)
INSERT INTO pests (key_name, scientific_name, danger_level) VALUES
('pink bollworm', 'Pectinophora gossypiella', 'high'),
('fall armyworm', 'Spodoptera frugiperda', 'critical'),
('aphids', 'Aphis gossypii', 'moderate'),
('whitefly', 'Bemisia tabaci', 'high'),
('thrips', 'Thrips tabaci', 'moderate'),
('pod_borer', 'Helicoverpa armigera', 'high'),
('mealybug', 'Planococcus citri', 'moderate'),
('red_hairy_caterpillar', 'Amsacta albistriga', 'high'),
('wheat_rust', 'Puccinia triticina', 'high'),
('brown_plant_hopper', 'Nilaparvata lugens', 'critical'),
('stem_borer', 'Chilo partellus', 'high'),
('leaf_blast', 'Magnaporthe grisea', 'high');
