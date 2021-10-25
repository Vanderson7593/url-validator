## :rocket: This is a simple URL validator.

## Used Technologies

1. React - Javascript framework
2. Laravel - PHP framework
3. Mysql - Relational database

### Installation Instructions

1. Run `git clone https://github.com/Vanderson7593/url-validator.git`
1. Create a MySQL database for the project
    - `mysql -u root -p`, if using Vagrant: `mysql -u homestead -psecret`
    - `create database url-validator;`
    - `\q`
1. Configure your `.env` file
1. Run `composer update` from the projects root folder
1. From the projects root folder run `php artisan migrate`

#### Build the Front End Assets with Mix

##### Using Yarn:

1. From the projects root folder run `yarn install`
2. From the projects root folder run `yarn run dev` or `yarn run production`

-   You can watch assets with `yarn run watch`

##### Using NPM:

1. From the projects root folder run `npm install`
2. From the projects root folder run `npm run dev` or `npm run production`

-   You can watch assets with `npm run watch`

#### Optionally Build Cache

1. From the projects root folder run `php artisan config:cache`

### Routes

+--------+----------------------------------------+---------------------+------+------------------------------------------------------------+-----------------------------------+
| Domain | Method | URI | Name | Action | Middleware |
+--------+----------------------------------------+---------------------+------+------------------------------------------------------------+-----------------------------------+
| | GET|HEAD | / | | Closure | web |
| | POST | api/auth/login | | App\Http\Controllers\AuthController@login | api |
| | POST | api/auth/logout | | App\Http\Controllers\AuthController@logout | api |
| | | | | | App\Http\Middleware\JwtMiddleware |
| | POST | api/auth/me | | App\Http\Controllers\AuthController@me | api |
| | | | | | App\Http\Middleware\JwtMiddleware |
| | POST | api/auth/refresh | | App\Http\Controllers\AuthController@refresh | api |
| | | | | | App\Http\Middleware\JwtMiddleware |
| | POST | api/auth/register | | App\Http\Controllers\AuthController@register | api |
| | GET|HEAD | api/urls | | App\Http\Controllers\UrlController@index | api |
| | | | | | App\Http\Middleware\JwtMiddleware |
| | POST | api/urls/create | | App\Http\Controllers\UrlController@create | api |
| | | | | | App\Http\Middleware\JwtMiddleware |
| | GET|HEAD | sanctum/csrf-cookie | | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show | web |
| | GET|HEAD|POST|PUT|PATCH|DELETE|OPTIONS | {any}/{all?} | | Closure | web |
+--------+----------------------------------------+---------------------+------+------------------------------------------------------------+-----------------------------------+

### Run

To run the server:

```
php artisan serve
```

### Tests

To run PHPUnit tests:

```
php artisan test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
