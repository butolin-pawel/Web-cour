    CREATE database serv_db;
    \c serv_db;
    CREATE schema wheels;
    SET search_path = 'wheels';
    CREATE TABLE employee(
        id serial not null primary key,
        surname varchar(30) not null,
        name varchar(30) not null,
        patronymic varchar(30) null,
        dob date not null CHECK (dob > '1930-01-01 ' :: date),
        phonenumber char(12) not null UNIQUE,
        password varchar(100) not null,
        post varchar(30) not null
    );
    CREATE TABLE client(
        id serial not null primary key,
        surname varchar(30) not null,
        name varchar(30) not null,
        patronymic varchar(30) null,
        dob date not null CHECK (dob > '1930-01-01 ' :: date),
        phonenumber char(12) not null UNIQUE,
        password varchar(100) not null,
        email varchar(50) not null 
    );
    CREATE TABLE car_type(
        id serial not null primary key,
        type varchar(40) not null
    );
    CREATE TABLE wheel_radius(
        id serial not null primary key,
        radius varchar(40) not null
    );
    CREATE TABLE status(
        id serial not null primary key,
        status varchar(40) not null
    );
    CREATE TABLE request(
        id serial not null primary key,
        client integer not null,
        startdate timestamp without time zone not null,
        enddate timestamp without time zone not null,
        summ numeric(8,2),
        car_type integer not null,
        wheel_radius integer not null,
        status integer not null default '1',
        CONSTRAINT FK foreign key(client) REFERENCES client(id) ON UPDATE CASCADE ON DELETE NO ACTION,
        CONSTRAINT FK1 foreign key(car_type) REFERENCES car_type(id) ON UPDATE CASCADE ON DELETE NO ACTION,
        CONSTRAINT FK2 foreign key(wheel_radius) REFERENCES wheel_radius(id) ON UPDATE CASCADE ON DELETE NO ACTION,
        CONSTRAINT FK3 foreign key(status) REFERENCES status(id) ON UPDATE CASCADE ON DELETE NO ACTION
    );
    CREATE TABLE service(
        id serial not null primary key,
        name varchar(40) not null,
        description text null,
        cost numeric(8,2) not null CHECK (cost > 0.0 )
    );
    CREATE TABLE product(
        id serial not null primary key,
        name varchar(50) not null,
        maker varchar(50) not null,
        
        height varchar(5) not null,
        characters json not null,
        
        cost numeric(8,2) not null CHECK (cost > 0.0 ),
        
    );
    CREATE TABLE product_radius(
        id serial not null primary key,
        product integer not null,
        count integer not null CHECK  (count > 0 :: integer),
        radius integer not null,
        CONSTRAINT FK1 foreign key(product) REFERENCES product(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK2 foreign key(radius) REFERENCES wheel_radius(id) ON UPDATE CASCADE ON DELETE NO ACTION
    );
    CREATE TABLE cart_service(
        id serial not null primary key,
        request integer not null,
        serv integer not null,
        cost numeric(8,2) not null,
        CONSTRAINT FK foreign key(request) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK1 foreign key(serv) REFERENCES service(id) ON UPDATE CASCADE ON DELETE NO ACTION
    );
    CREATE TABLE cart_product(
        id serial not null primary key,
        request integer not null,
        product integer not null,
        productradius integer not null;
        count integer not null,
        cost numeric(8,2) not null,
        CONSTRAINT FK foreign key(request) REFERENCES request(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT FK1 foreign key(product) REFERENCES product(id) ON UPDATE CASCADE ON DELETE NO ACTION
    );

    INSERT INTO wheel_radius values (default,'13R'),
    (default,'14R'),
    (default,'15R'),
    (default,'16R'),
    (default,'17R'),
    (default,'18R'),
    (default,'19R'),
    (default,'20R'),
    (default,'21R');
    INSERT INTO car_type values (default,'Легковой'),
                                (default,'Грузовой'),
                                (default,'Автобус'),
                                (default,'Прицеп');
    INSERT INTO status values (default,'Создана'),
                              (default,'Оплачена'),
                              (default,'Завершена');
INSERT INTO product values (default,'Диск','Vossen',3,'[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"57"}]',12,7400.00,'6,5');
INSERT into product values (default,'Резина','Cordiant',3,'[{"Сезон":"Лето","Профиль":"70","Шипы":"Нет"}]',12,4700.00,'215');
INSERT INTO service values (default,'Шиномонтаж, балансировка','Замена колёс на вашем автомобиле быстро и качественно',1200.00),
                            (default,'Развал-схождение колёс','Выставление угла колёс, что позволяет машине ехать ровно',2400.00),
                            (default,'Замена масла','Слив старого масла, замена маслянного фильтра и залив нового масла',500.00),
                            (default,'Ремонт дисков','Ремонт трещин аргоном, правка мятин',1700.00),
                            (default,'Ремонт резины','Удаление проколов и боковых порезов',300.00),
                            (default,'Покраска дисков','Придайте индивидуальности своему автомобилю',3700.00);
INSERT into product values
                            (default,'Диск','Enkei','[{"Тип":"Кованный","Разболтовка":"4x100","Центральное отверстие":"57"}]',11349.00,'6.0'),
                            (default,'Диск','BBS','[{"Тип":"Кованный","Разболтовка":"4x108","Центральное отверстие":"64"}]',10801.00,'6.5'),
                            (default,'Диск','Vorsteiner','[{"Тип":"Литой","Разболтовка":"5x100","Центральное отверстие":"57"}]',12093.00,'7.0'),
                            (default,'Диск','ADV.1','[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"57"}]',13222.00,'7.5'),
                            (default,'Диск','Rays','[{"Тип":"Литой","Разболтовка":"4x100","Центральное отверстие":"60"}]',6067.00,'8.0'),
                            (default,'Диск','OZ Racing','[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"64"}]',13535.00,'8.5'),
                            (default,'Диск','HRE','[{"Тип":"Кованный","Разболтовка":"5x100","Центральное отверстие":"57"}]',7139.00,'9.0'),
                            (default,'Диск','Volk Racing','[{"Тип":"Кованный","Разболтовка":"4x100","Центральное отверстие":"64"}]',9897.00,'9.5'),
                            (default,'Диск','Work','[{"Тип":"Штампованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',11347.00,'10.0'),
                            (default,'Диск','Konig','[{"Тип":"Штампованный","Разболтовка":"5x100","Центральное отверстие":"57"}]',12034.00,'10.5'),
                            (default,'Диск','Enkei','[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"60"}]',8562.00,'6.0'),
                            (default,'Диск','BBS','[{"Тип":"Кованный","Разболтовка":"4x100","Центральное отверстие":"57"}]',12908.00,'6.5'),
                            (default,'Диск','Vorsteiner','[{"Тип":"Кованный","Разболтовка":"4x108","Центральное отверстие":"60"}]',10685.00,'7.0'),
                            (default,'Диск','ADV.1','[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"64"}]',14051.00,'7.5'),
                            (default,'Диск','Rays','[{"Тип":"Литой","Разболтовка":"5x100","Центральное отверстие":"60"}]',12335.00,'8.0'),
                            (default,'Диск','OZ Racing','[{"Тип":"Кованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',10568.00,'8.5'),
                            (default,'Диск','HRE','[{"Тип":"Кованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',9190.00,'9.0'),
                            (default,'Диск','Volk Racing','[{"Тип":"Литой","Разболтовка":"5x100","Центральное отверстие":"60"}]',14087.00,'9.5'),
                            (default,'Диск','Work','[{"Тип":"Штампованный","Разболтовка":"4x100","Центральное отверстие":"57"}]',14677.00,'10.0'),
                            (default,'Диск','Konig','[{"Тип":"Штампованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',9516.00,'10.5'),
                            (default,'Диск','Enkei','[{"Тип":"Кованный","Разболтовка":"5x100","Центральное отверстие":"57"}]',10892.00,'6.0'),
                            (default,'Диск','BBS','[{"Тип":"Кованный","Разболтовка":"4x108","Центральное отверстие":"60"}]',11902.00,'6.5'),
                            (default,'Диск','Vorsteiner','[{"Тип":"Литой","Разболтовка":"4x100","Центральное отверстие":"57"}]',8596.00,'7.0'),
                            (default,'Диск','ADV.1','[{"Тип":"Кованный","Разболтовка":"4x100","Центральное отверстие":"64"}]',12143.00,'7.5'),
                            (default,'Диск','Rays','[{"Тип":"Штампованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',12335.00,'8.0'),
                            (default,'Диск','OZ Racing','[{"Тип":"Кованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',10568.00,'8.5'),
                            (default,'Диск','HRE','[{"Тип":"Кованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',14218.00,'9.0'),
                            (default,'Диск','Volk Racing','[{"Тип":"Литой","Разболтовка":"5x100","Центральное отверстие":"64"}]',10548.00,'9.5'),
                            (default,'Диск','Work','[{"Тип":"Штампованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',14677.00,'10.0'),
                            (default,'Диск','Konig','[{"Тип":"Штампованный","Разболтовка":"4x100","Центральное отверстие":"57"}]',9516.00,'10.5'),
                            (default,'Диск','Enkei','[{"Тип":"Кованный","Разболтовка":"4x108","Центральное отверстие":"60"}]',10892.00,'6.0'),
                            (default,'Диск','BBS','[{"Тип":"Кованный","Разболтовка":"5х112","Центральное отверстие":"57"}]',11902.00,'6.5'),
                            (default,'Диск','Vorsteiner','[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"64"}]',8596.00,'7.0'),
                            (default,'Диск','ADV.1','[{"Тип":"Кованный","Разболтовка":"4x108","Центральное отверстие":"60"}]',12143.00,'7.5');
INSERT into product_radius values
                                (default,4,20,1),
                                (default,4,16,3),
                                (default,4,20,5),
                                (default,4,16,7),
                                (default,4,24,9),
                                (default,4,20,2),

                                (default,5,20,4),
                                (default,5,16,6),
                                (default,5,20,8),
                                (default,5,16,1),
                                (default,5,24,3),
                                (default,5,20,5),

                                (default,6,20,7),
                                (default,6,16,9),
                                (default,6,20,2),
                                (default,6,16,4),
                                (default,6,24,6),
                                (default,6,20,8),

                                (default,7,20,1),
                                (default,7,16,3),
                                (default,7,20,5),
                                (default,7,16,7),
                                (default,7,24,9),
                                (default,7,20,2),

                                (default,8,20,4),
                                (default,8,16,6),
                                (default,8,20,8),
                                (default,8,16,1),
                                (default,8,24,3),
                                (default,8,20,5),

                                (default,9,20,7),
                                (default,9,16,9),
                                (default,9,20,2),
                                (default,9,16,4),
                                (default,9,24,6),
                                (default,9,20,8),

                                (default,10,20,1),
                                (default,10,16,3),
                                (default,10,20,5),
                                (default,10,16,7),
                                (default,10,24,9),
                                (default,10,20,2),

                                (default,11,20,4),
                                (default,11,16,6),
                                (default,11,20,8),
                                (default,11,16,1),
                                (default,11,24,3),
                                (default,11,20,5),

                                (default,12,20,7),
                                (default,12,16,9),
                                (default,12,20,2),
                                (default,12,16,4),
                                (default,12,24,6),
                                (default,12,20,8),

                                (default,13,20,1),
                                (default,13,16,3),
                                (default,13,20,5),
                                (default,13,16,7),
                                (default,13,24,9),
                                (default,13,20,2),

                                (default,14,20,4),
                                (default,14,16,6),
                                (default,14,20,8),
                                (default,14,16,1),
                                (default,14,24,3),
                                (default,14,20,5),

                                (default,15,20,7),
                                (default,15,16,9),
                                (default,15,20,2),
                                (default,15,16,4),
                                (default,15,24,6),
                                (default,15,20,8),

                                (default,16,20,1),
                                (default,16,16,3),
                                (default,16,20,5),
                                (default,16,16,7),
                                (default,16,24,9),
                                (default,16,20,2),

                                (default,17,20,4),
                                (default,17,16,6),
                                (default,17,20,8),
                                (default,17,16,1),
                                (default,17,24,3),
                                (default,17,20,5),

                                (default,18,20,7),
                                (default,18,16,9),
                                (default,18,20,2),
                                (default,18,16,4),
                                (default,18,24,6),
                                (default,18,20,8),

                                (default,19,20,1),
                                (default,19,16,3),
                                (default,19,20,5),
                                (default,19,16,7),
                                (default,19,24,9),
                                (default,19,20,2),

                                (default,20,20,4),
                                (default,20,16,6),
                                (default,20,20,8),
                                (default,20,16,1),
                                (default,20,24,3),
                                (default,20,20,5),

                                (default,21,20,7),
                                (default,21,16,9),
                                (default,21,20,2),
                                (default,21,16,4),
                                (default,21,24,6),
                                (default,21,20,8),

                                (default,22,20,1),
                                (default,22,16,3),
                                (default,22,20,5),
                                (default,22,16,7),
                                (default,22,24,9),
                                (default,22,20,2),

                                (default,23,20,4),
                                (default,23,16,6),
                                (default,23,20,8),
                                (default,23,16,1),
                                (default,23,24,3),
                                (default,23,20,5),

                                (default,24,20,7),
                                (default,24,16,9),
                                (default,24,20,2),
                                (default,24,16,4),
                                (default,24,24,6),
                                (default,24,20,8),

                                (default,25,20,1),
                                (default,25,16,3),
                                (default,25,20,5),
                                (default,25,16,7),
                                (default,25,24,9),
                                (default,25,20,2),

                                (default,26,20,4),
                                (default,26,16,6),
                                (default,26,20,8),
                                (default,26,16,1),
                                (default,26,24,3),
                                (default,26,20,5),

                                (default,27,20,7),
                                (default,27,16,9),
                                (default,27,20,2),
                                (default,27,16,4),
                                (default,27,24,6),
                                (default,27,20,8),

                                (default,28,20,1),
                                (default,28,16,3),
                                (default,28,20,5),
                                (default,28,16,7),
                                (default,28,24,9),
                                (default,28,20,2),

                                (default,29,20,4),
                                (default,29,16,6),
                                (default,29,20,8),
                                (default,29,16,1),
                                (default,29,24,3),
                                (default,29,20,5),

                                (default,30,20,7),
                                (default,30,16,9),
                                (default,30,20,2),
                                (default,30,16,4),
                                (default,30,24,6),
                                (default,30,20,8),

                                (default,31,20,1),
                                (default,31,16,3),
                                (default,31,20,5),
                                (default,31,16,7),
                                (default,31,24,9),
                                (default,31,20,2),

                                (default,32,20,4),
                                (default,32,16,6),
                                (default,32,20,8),
                                (default,32,16,1),
                                (default,32,24,3),
                                (default,32,20,5),

                                (default,33,20,7),
                                (default,33,16,9),
                                (default,33,20,2),
                                (default,33,16,4),
                                (default,33,24,6),
                                (default,33,20,8),

                                (default,34,20,1),
                                (default,34,16,3),
                                (default,34,20,5),
                                (default,34,16,7),
                                (default,34,24,9),
                                (default,34,20,2),

                                (default,35,20,4),
                                (default,35,16,6),
                                (default,35,20,8),
                                (default,35,16,1),
                                (default,35,24,3),
                                (default,35,20,5),

                                (default,36,20,7),
                                (default,36,16,9),
                                (default,36,20,2),
                                (default,36,16,4),
                                (default,36,24,6),
                                (default,36,20,8),

                                (default,37,20,1),
                                (default,37,16,3),
                                (default,37,20,5),
                                (default,37,16,7),
                                (default,37,24,9),
                                (default,37,20,2);



INSERT into product_radius values
                                (default,38,20,1),
                                (default,38,16,3),
                                (default,38,20,5),
                                (default,38,16,7),
                                (default,38,24,9),
                                (default,38,20,2),

                                (default,39,20,4),
                                (default,39,16,6),
                                (default,39,20,8),
                                (default,39,16,1),
                                (default,39,24,3),
                                (default,39,20,5),

                                (default,40,20,7),
                                (default,40,16,9),
                                (default,40,20,2),
                                (default,40,16,4),
                                (default,40,24,6),
                                (default,40,20,8),

                                (default,41,20,1),
                                (default,41,16,3),
                                (default,41,20,5),
                                (default,41,16,7),
                                (default,41,24,9),
                                (default,41,20,2),

                                (default,42,20,4),
                                (default,42,16,6),
                                (default,42,20,8),
                                (default,42,16,1),
                                (default,42,24,3),
                                (default,42,20,5),

                                (default,43,20,7),
                                (default,43,16,9),
                                (default,43,20,2),
                                (default,43,16,4),
                                (default,43,24,6),
                                (default,43,20,8),

                                (default,44,20,1),
                                (default,44,16,3),
                                (default,44,20,5),
                                (default,44,16,7),
                                (default,44,24,9),
                                (default,44,20,2),

                                (default,45,20,4),
                                (default,45,16,6),
                                (default,45,20,8),
                                (default,45,16,1),
                                (default,45,24,3),
                                (default,45,20,5),

                                (default,46,20,7),
                                (default,46,16,9),
                                (default,46,20,2),
                                (default,46,16,4),
                                (default,46,24,6),
                                (default,46,20,8),

                                (default,47,20,1),
                                (default,47,16,3),
                                (default,47,20,5),
                                (default,47,16,7),
                                (default,47,24,9),
                                (default,47,20,2),

                                (default,48,20,4),
                                (default,48,16,6),
                                (default,48,20,8),
                                (default,48,16,1),
                                (default,48,24,3),
                                (default,48,20,5),

                                (default,49,20,7),
                                (default,49,16,9),
                                (default,49,20,2),
                                (default,49,16,4),
                                (default,49,24,6),
                                (default,49,20,8),

                                (default,50,20,1),
                                (default,50,16,3),
                                (default,50,20,5),
                                (default,50,16,7),
                                (default,50,24,9),
                                (default,50,20,2),

                                (default,51,20,4),
                                (default,51,16,6),
                                (default,51,20,8),
                                (default,51,16,1),
                                (default,51,24,3),
                                (default,51,20,5),

                                (default,52,20,7),
                                (default,52,16,9),
                                (default,52,20,2),
                                (default,52,16,4),
                                (default,52,24,6),
                                (default,52,20,8),

                                (default,53,20,1),
                                (default,53,16,3),
                                (default,53,20,5),
                                (default,53,16,7),
                                (default,53,24,9),
                                (default,53,20,2),

                                (default,54,20,4),
                                (default,54,16,6),
                                (default,54,20,8),
                                (default,54,16,1),
                                (default,54,24,3),
                                (default,54,20,5),

                                (default,55,20,7),
                                (default,55,16,9),
                                (default,55,20,2),
                                (default,55,16,4),
                                (default,55,24,6),
                                (default,55,20,8),

                                (default,56,20,1),
                                (default,56,16,3),
                                (default,56,20,5),
                                (default,56,16,7),
                                (default,56,24,9),
                                (default,56,20,2),

                                (default,57,20,4),
                                (default,57,16,6),
                                (default,57,20,8),
                                (default,57,16,1),
                                (default,57,24,3),
                                (default,57,20,5),

                                (default,58,20,7),
                                (default,58,16,9),
                                (default,58,20,2),
                                (default,58,16,4),
                                (default,58,24,6),
                                (default,58,20,8),

                                (default,59,20,1),
                                (default,59,16,3),
                                (default,59,20,5),
                                (default,59,16,7),
                                (default,59,24,9),
                                (default,59,20,2),

                                (default,60,20,4),
                                (default,60,16,6),
                                (default,60,20,8),
                                (default,60,16,1),
                                (default,60,24,3),
                                (default,60,20,5),

                                (default,61,20,7),
                                (default,61,16,9),
                                (default,61,20,2),
                                (default,61,16,4),
                                (default,61,24,6),
                                (default,61,20,8),

                                (default,62,20,1),
                                (default,62,16,3),
                                (default,62,20,5),
                                (default,62,16,7),
                                (default,62,24,9),
                                (default,62,20,2),

                                (default,63,20,4),
                                (default,63,16,6),
                                (default,63,20,8),
                                (default,63,16,1),
                                (default,63,24,3),
                                (default,63,20,5),

                                (default,64,20,7),
                                (default,64,16,9),
                                (default,64,20,2),
                                (default,64,16,4),
                                (default,64,24,6),
                                (default,64,20,8),

                                (default,65,20,1),
                                (default,65,16,3),
                                (default,65,20,5),
                                (default,65,16,7),
                                (default,65,24,9),
                                (default,65,20,2),

                                (default,66,20,4),
                                (default,66,16,6),
                                (default,66,20,8),
                                (default,66,16,1),
                                (default,66,24,3),
                                (default,66,20,5),

                                (default,67,20,7),
                                (default,67,16,9),
                                (default,67,20,2),
                                (default,67,16,4),
                                (default,67,24,6),
                                (default,67,20,8);








INSERT into product values 
                            (default, 'Резина', 'Белшина', '[{"Сезон": "Лето", "Профиль": "70", "Шипы": "Нет"}]', 5612.84, '215'),
                            (default, 'Резина', 'Continental', '[{"Сезон": "Зима", "Профиль": "60", "Шипы": "Да"}]', 6825.62, '225'),
                            (default, 'Резина', 'Michelin', '[{"Сезон": "Лето", "Профиль": "65", "Шипы": "Нет"}]', 8769.27, '235'),
                            (default, 'Резина', 'Goodyear', '[{"Сезон": "Зима", "Профиль": "55", "Шипы": "Липучка"}]', 7450.36, '195'),
                            (default, 'Резина', 'Bridgestone', '[{"Сезон": "Зима", "Профиль": "60", "Шипы": "Да"}]', 6324.93, '215'),
                            (default, 'Резина', 'Pirelli', '[{"Сезон": "Лето", "Профиль": "70", "Шипы": "Нет"}]', 5096.28, '215'),
                            (default, 'Резина', 'Hankook', '[{"Сезон": "Лето", "Профиль": "60", "Шипы": "Нет"}]', 4215.48, '225'),
                            (default, 'Резина', 'Continental', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Да"}]', 7048.99, '235'),
                            (default, 'Резина', 'Bridgestone', '[{"Сезон": "Лето", "Профиль": "60", "Шипы": "Нет"}]', 5768.26, '195'),
                            (default, 'Резина', 'Goodyear', '[{"Сезон": "Лето", "Профиль": "70", "Шипы": "Нет"}]', 6114.87, '215'),
                            (default, 'Резина', 'Michelin', '[{"Сезон": "Зима", "Профиль": "65", "Шипы": "Липучка"}]', 6437.18, '215'),
                            (default, 'Резина', 'Pirelli', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Да"}]', 4243.95, '195'),
                            (default, 'Резина', 'Hankook', '[{"Сезон": "Лето", "Профиль": "55", "Шипы": "Нет"}]', 5411.79, '225'),
                            (default, 'Резина', 'Bridgestone', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Да"}]', 6685.61, '215'),
                            (default, 'Резина', 'Continental', '[{"Сезон": "Лето", "Профиль": "60", "Шипы": "Нет"}]', 3256.46, '235'),
                            (default, 'Резина', 'Michelin', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Липучка"}]', 9035.71, '225'),
                            (default, 'Резина', 'Pirelli', '[{"Сезон": "Лето", "Профиль": "65", "Шипы": "Нет"}]', 3972.15, '215'),
                            (default, 'Резина', 'Hankook', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Липучка"}]', 5517.84, '195'),
                            (default, 'Резина', 'Bridgestone', '[{"Сезон": "Зима", "Профиль": "55", "Шипы": "Да"}]', 7378.45, '225'),
                            (default, 'Резина', 'Continental', '[{"Сезон": "Лето", "Профиль": "70", "Шипы": "Нет"}]', 4158.92, '215'),
                            (default, 'Резина', 'Goodyear', '[{"Сезон": "Лето", "Профиль": "60", "Шипы": "Нет"}]', 3334.61, '195'),
                            (default, 'Резина', 'Pirelli', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Да"}]', 8566.22, '225'),
                            (default, 'Резина', 'Hankook', '[{"Сезон": "Лето", "Профиль": "65", "Шипы": "Нет"}]', 7825.74, '215'),
                            (default, 'Резина', 'Continental', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Да"}]', 5336.41, '235'),
                            (default, 'Резина', 'Michelin', '[{"Сезон": "Лето", "Профиль": "55", "Шипы": "Нет"}]', 6448.92, '215'),
                            (default, 'Резина', 'Goodyear', '[{"Сезон": "Зима", "Профиль": "60", "Шипы": "Липучка"}]', 4893.76, '235'),
                            (default, 'Резина', 'Bridgestone', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Да"}]', 7877.13, '225'),
                            (default, 'Резина', 'Continental', '[{"Сезон": "Лето", "Профиль": "65", "Шипы": "Нет"}]', 3484.59, '215'),
                            (default, 'Резина', 'Michelin', '[{"Сезон": "Зима", "Профиль": "70", "Шипы": "Липучка"}]', 8139.51, '195'),
                            (default, 'Резина', 'Goodyear', '[{"Сезон": "Лето", "Профиль": "60", "Шипы": "Нет"}]', 5342.68, '215');

