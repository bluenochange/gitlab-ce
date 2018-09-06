# frozen_string_literal: true

class EventFilter
  attr_accessor :filter

  FILTERS = %w[all push merged issue comments team].freeze

  def self.all
    'all'
  end

  def self.push
    'push'
  end

  def self.merged
    'merged'
  end

  def self.issue
    'issue'
  end

  def self.comments
    'comments'
  end

  def self.team
    'team'
  end

  def initialize(filter)
    # Split using comma to maintain backward compatibility Ex/ "filter1,filter2"
    filter = filter.to_s.split(',')[0].to_s
    @filter = FILTERS.include?(filter) ? filter : self.class.all
  end

  def active?(key)
    filter == key.to_s
  end

  def apply_filter(events)
    case filter
    when EventFilter.push
      events.where(action: Event::PUSHED)
    when EventFilter.merged
      events.where(action: Event::MERGED)
    when EventFilter.comments
      events.where(action: Event::COMMENTED)
    when EventFilter.team
      events.where(action: [Event::JOINED, Event::LEFT, Event::EXPIRED])
    when EventFilter.issue
      events.where(action: [Event::CREATED, Event::UPDATED, Event::CLOSED, Event::REOPENED])
    else
      events
    end
  end
end
