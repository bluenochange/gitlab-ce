require 'spec_helper'

describe EE::Ci::Runner, models: true do
  describe '#tick_runner_queue' do
    it 'sticks the runner to the primary and calls the original method' do
      runner = create(:ci_runner)

      allow(Gitlab::Database::LoadBalancing).to receive(:enable?).
        and_return(true)

      expect(Gitlab::Database::LoadBalancing::Sticking).to receive(:stick).
        with(:runner, runner.token)

      expect(Gitlab::Workhorse).to receive(:set_key_and_notify)

      runner.tick_runner_queue
    end
  end
end
