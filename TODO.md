# Plan de Implementación: Seeder de Usuarios

## Información Recolectada

### Modelo de Usuario (`models/usuario.js`)
- **Campos requeridos**: first_name, last_name, email, password, role
- **Campo role**: tipo String, default 'USER'
- **Biblioteca para hashing**: bcryptjs

### Roles Requeridos
- SUPERADMIN
- ADMIN
- CHOFER
- USER

### Usuarios a Crear
| Email | Password | Role |
|-------|----------|------|
| superadmin@superadmin.com | password | SUPERADMIN |
| admin@admin.com | password | ADMIN |
| chofer@chofer.com | password | CHOFER |
| user@user.com | password | USER |

## Plan de Implementación

✅ 1. **Crear archivo seeder**: `seeders/usuarioSeeder.js`
   - Importar mongoose y conectar a la base de datos
   - Importar el modelo Usuario
   - Importar bcryptjs para hash de contraseña
   - Definir array de usuarios con los 4 roles
   - Crear función `seedUsuarios()` que:
     - Conecte a la base de datos
     - Elimine usuarios existentes
     - Hashee las contraseñas con bcrypt
     - Inserte los nuevos usuarios
     - Cierre la conexión

✅ 2. **Actualizar package.json**
   - Agregar script para ejecutar el seeder de usuarios

3. **Ejecutar el seeder**
   - npm run seed:usuarios

## Archivos a Editar/Crear
- ✅ `seeders/usuarioSeeder.js` (creado)
- ✅ `package.json` (actualizado)

## Comandos de Verificación
- npm run seed:usuarios

