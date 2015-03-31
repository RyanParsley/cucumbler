Feature: Contact Page
	As a user I want visual consistency on http://url.com
	Scenario: Visit the contact page with a laptop
		Given I visit "http://url.com/contact"

		Then "heading 1" should have "32px" of "#efefef"
		Then "heading 2" should have "24px" of "#cccccc"
		Then "heading 3" should have "18px" of "#ff0000"
