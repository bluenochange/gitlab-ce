module QA
  module Factory
    module Resource
      class Fork < Factory::Base
        dependency Factory::Repository::ProjectPush, as: :push

        dependency Factory::Resource::User, as: :user do |user|
          if Runtime::Env.forker?
            user.username = Runtime::Env.forker_username
            user.password = Runtime::Env.forker_password
          end
        end

        product(:user) { |factory| factory.user }

        def visit_project_with_retry
          start = Time.now

          while Time.now - start < 20
            push.project.visit!

            return if Page::Menu::Main.act { has_personal_area?(wait: 1) }

            Page::Menu::Main.act { sign_out }

            Page::Main::Login.perform do |login|
              login.sign_in_using_credentials(user)
            end
          end

          raise "Failed to load project page and stay logged in"
        end

        def fabricate!
          Capybara::Screenshot.screenshot_and_save_page
          visit_project_with_retry
          Capybara::Screenshot.screenshot_and_save_page
          Page::Project::Show.act { fork_project }

          Page::Project::Fork::New.perform do |fork_new|
            fork_new.choose_namespace(user.name)
          end

          Page::Layout::Banner.act { has_notice?('The project was successfully forked.') }
        end
      end
    end
  end
end
