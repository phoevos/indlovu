DROP DATABASE indlovu;
CREATE DATABASE indlovu;
USE indlovu;

source ./setup/tables.sql;
source ./setup/views.sql;
source ./setup/trigger.sql
source ./setup/populate.sql;
#source ./setup/indexes.sql;