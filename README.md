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

```
+--------+----------------------------------------+--------------------------------------+---------------+------------------------------------------------------------+------------+
| Domain | Method                                 | URI                                  | Name          | Action                                                     | Middleware |
+--------+----------------------------------------+--------------------------------------+---------------+------------------------------------------------------------+------------+
|        | GET|HEAD                               | /                                    |               | Closure                                                    | web        |
|        | GET|HEAD                               | api/courses                          | courses.index | App\Http\Controllers\CourseController@index                | api        |
|        | POST                                   | api/courses                          | courses.store | App\Http\Controllers\CourseController@store                | api        |
|        | GET|HEAD                               | api/subscriptions                    | index         | App\Http\Controllers\SubscriptionController@index          | api        |
|        | POST                                   | api/subscriptions                    | store         | App\Http\Controllers\SubscriptionController@store          | api        |
|        | PATCH                                  | api/subscriptions/status/update/{id} |               | App\Http\Controllers\SubscriptionController@updateStatus   | api        |
|        | GET|HEAD                               | api/subscriptions/{}                 | show          | App\Http\Controllers\SubscriptionController@show           | api        |
|        | PUT|PATCH                              | api/subscriptions/{}                 | update        | App\Http\Controllers\SubscriptionController@update         | api        |
|        | DELETE                                 | api/subscriptions/{}                 | destroy       | App\Http\Controllers\SubscriptionController@destroy        | api        |
|        | GET|HEAD                               | api/users                            | users.index   | App\Http\Controllers\UserController@index                  | api        |
|        | POST                                   | api/users                            | users.store   | App\Http\Controllers\UserController@store                  | api        |
|        | GET|HEAD                               | sanctum/csrf-cookie                  |               | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show | web        |
|        | GET|HEAD|POST|PUT|PATCH|DELETE|OPTIONS | {any}/{all?}                         |               | Closure                                                    | web        |
+--------+----------------------------------------+--------------------------------------+---------------+------------------------------------------------------------+------------+
```

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
