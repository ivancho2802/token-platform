<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //

define( 'FS_METHOD', 'direct' );
/** The name of the database for WordPress */
define( 'DB_NAME', 'blog' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'UPLOADS', 'wp-content/uploads' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'F5.$6x4vJG+3PnZ,(FESd*[+3dVD&C]TsfxQr_ngSXx![@8C&GjHX4Nm0q!w4bw]' );
define( 'SECURE_AUTH_KEY',  '@j=u=2=j!xcQ8mmo=WX5[f%r{:Gtweo(@W>eK%/&W,s6lR5xc=7A1_bHmT)w^k;7' );
define( 'LOGGED_IN_KEY',    'v:vkL#?t4RkxF$HQ3G-R:B~sVwup@CZ;=4ZkZY7]W x:Oe?Ik+w]As03bmWcxSnd' );
define( 'NONCE_KEY',        'o~;i-9$AwBp|[o hZ(&DNXbRznSdxhi>:J8?CEhGR8Hcuo|Jr`8.I?yi:s;4FjV]' );
define( 'AUTH_SALT',        'T3RR=Kf<zq)[X2!9*4UB;o`4zU0`%5R^UH>]QH)`ewgR`Y}AE4W37^Mx`>Gs:[}Q' );
define( 'SECURE_AUTH_SALT', '+{muiAt=Sr/rDnpH}plX@s}Q>IbH{6QgyVVxX0q:%#Z)`rj8:N?dQRk H4gk`tRz' );
define( 'LOGGED_IN_SALT',   ';+ $^&4LO}XF4i. yq%Mi/_W5VBP~-PSnPFP $U>zed$ ~-LNyvPyXuUu)d)8gqc' );
define( 'NONCE_SALT',       ' ?!!y:S(`Y]MIQ_-na3X6]?CB04z2Psj7=^VlG YOp93A$mWYh[Y7.YZe~ ma@Ev' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

