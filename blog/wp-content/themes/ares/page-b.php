<?php
/**
 * Template name: Template B
 */

get_header(); ?>

    <div id="primary" class="content-area">

        <main id="main" class="site-main">

            <div class="container">

                <div class="frontpage">

                    <?php while ( have_posts() ) : the_post(); ?>

                        <?php

                        $ares_options = ares_get_options();
                        $alternate_layout = isset( $ares_options['single_post_layout_style'] ) && $ares_options['single_post_layout_style'] == 'alternate' ? true : false;

                        ?>

                        <div class="homepage-content">

                            <div class="row">

                                <div class="col-md-<?php echo $ares_options['ares_single_layout'] == 'col2r' && is_active_sidebar(1) ? '8' : '12'; ?>">

                                    <?php if ( has_post_thumbnail() && $ares_options['ares_single_featured'] == 'on' && $alternate_layout ) : ?>

                                        <div class="featured-image">

                                            <img class="feat-img" src="<?php echo esc_url( get_the_post_thumbnail_url( get_the_ID(), 'large' ) ); ?>" alt="<?php esc_html( get_the_title() ); ?>">

                                        </div>

                                    <?php endif; ?>

                                    <article id="post-<?php the_ID(); ?>">

                                        <header class="entry-header">
                                            <?php the_title( '<h2 class="post-title ' . ( ( $alternate_layout ) ? 'alt-layout' : '' ) . '">', '</h2>' ); ?>
                                            <div class="avenue-underline"></div>
                                        </header><!-- .entry-header -->

                                        <div class="entry-content">
                                            <?php the_content(); ?>
                                            <?php

                                            if( is_active_sidebar('sidebar-b')) :

                                                dynamic_sidebar('sidebar-b');

                                            endif;

                                            wp_link_pages( array(
                                                'before' => '<div class="page-links">' . __( 'Pages:', 'ares' ),
                                                'after' => '</div>',
                                            ) );
                                            ?>
                                        </div><!-- .entry-content -->
                                        <footer class="entry-footer">
                                            <?php edit_post_link( __( 'Edit', 'ares' ), '<span class="edit-link">', '</span>' ); ?>
                                        </footer><!-- .entry-footer -->

                                    </article><!-- #post-## -->

                                </div>

                                <?php if ( $ares_options['ares_single_layout'] == 'col2r' && is_active_sidebar(1) ) : ?>

                                    <div class="col-md-4 avenue-sidebar">
                                        <?php get_sidebar(); ?>
                                    </div>

                                <?php endif; ?>

                            </div>

                        </div>


                        <?php

                        // If comments are open or we have at least one comment, load up the comment template
                        if (comments_open() || '0' != get_comments_number()) :
                            comments_template();
                        endif;

                        ?>

                    <?php endwhile; // end of the loop.   ?>



                </div>

            </div>

        </main><!-- #main -->

    </div><!-- #primary -->

<?php
get_footer();
