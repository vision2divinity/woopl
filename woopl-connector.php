<?php
/**
 * Plugin Name: WooCommerce Product Import Connector
 * Plugin URI: https://github.com/vision2divinity/woopl
 * Description: Connects WooCommerce with the WooCommerce Product Import Bot
 * Version: 1.0.0
 * Author: Vision2Divinity
 * License: GPL v2 or later
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WOOPL_VERSION', '1.0.0');
define('WOOPL_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WOOPL_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once WOOPL_PLUGIN_DIR . 'includes/class-woopl-admin.php';
require_once WOOPL_PLUGIN_DIR . 'includes/class-woopl-api.php';
require_once WOOPL_PLUGIN_DIR . 'includes/class-woopl-settings.php';

// Initialize plugin
class WooCommerce_Product_Import_Connector {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        
        // Register REST API endpoints
        add_action('rest_api_init', array($this, 'register_api_endpoints'));
        
        // Activation/Deactivation hooks
        register_activation_hook(__FILE__, array($this, 'activate'));
        register_deactivation_hook(__FILE__, array($this, 'deactivate'));
    }
    
    public function init() {
        // Check WooCommerce is active
        if (!class_exists('WooCommerce')) {
            add_action('admin_notices', array($this, 'woocommerce_missing_notice'));
            return;
        }
        
        // Initialize components
        new WOOPL_Admin();
        new WOOPL_API();
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Product Import Bot',
            'Import Bot',
            'manage_options',
            'woopl-dashboard',
            array($this, 'render_dashboard'),
            'dashicons-download',
            56
        );
        
        add_submenu_page(
            'woopl-dashboard',
            'Settings',
            'Settings',
            'manage_options',
            'woopl-settings',
            array($this, 'render_settings')
        );
        
        add_submenu_page(
            'woopl-dashboard',
            'Import Logs',