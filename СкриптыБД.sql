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
INSERT INTO product values (default,'Диск','Vossen',3,'[{"Тип":"Литой","Разболтовка":"5х112","Центральное отверстие":"57.1"}]',12,7400.00,'6,5');
INSERT into product values (default,'Резина','Cordiant',3,'[{"Сезон":"Лето","Профиль":"70","Шипы":"Нет"}]',12,4700.00,'215');
INSERT INTO service values (default,'Шиномонтаж, балансировка','Замена колёс на вашем автомобиле быстро и качественно',1200.00),
                            (default,'Развал-схождение колёс','Выставление угла колёс, что позволяет машине ехать ровно',2400.00),
                            (default,'Замена масла','Слив старого масла, замена маслянного фильтра и залив нового масла',500.00),
                            (default,'Ремонт дисков','Ремонт трещин аргоном, правка мятин',1700.00),
                            (default,'Ремонт резины','Удаление проколов и боковых порезов',300.00),
                            (default,'Покраска дисков','Придайте индивидуальности своему автомобилю',3700.00);

