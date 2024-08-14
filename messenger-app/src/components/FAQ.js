import React from 'react';

function Faq() {
  const faqs = [
    {
      question: 'How do I send a message?',
      answer: 'To send a message, type your message in the input field and press send.'
    },
    {
      question: 'How do I add a profile picture?',
      answer: 'Go to the profile section and upload your profile picture.'
    },
    {
      question: 'How do I create a new post?',
      answer: 'To create a new post, go to the home page or your profile and look for the “Create Post” button. Click it, write your message or upload your media, and then click “Post” to share it with your followers.'
    },
    {
      question: 'How can I edit or delete my posts?',
      answer: 'To edit or delete a post, go to your profile or the post’s location, click on the three dots (or menu icon) next to the post, and select either “Edit” or “Delete.” Make your changes or confirm the deletion as needed.'
    },
    {
      question: 'How do I follow or unfollow someone?',
      answer: 'To follow someone, go to their profile and click the “Follow” button. To unfollow, visit their profile again and click “Following,” which will change to “Follow” once you have unfollowed them.'
    },
    {
      question: 'How can I change my profile information?',
      answer: 'To update your profile information, go to your profile page, click “Edit Profile,” and make the necessary changes to your bio, profile picture, and other details. Save your changes before exiting the page.'
    },
    {
      question: 'How do I manage my privacy settings?',
      answer: 'To manage privacy settings, go to your account settings and look for the “Privacy” or “Security” section. Here, you can adjust who can view your posts, send you messages, or see your profile information.'
    },
    {
      question: 'How can I report inappropriate content?',
      answer: 'If you encounter inappropriate content, click on the three dots (or menu icon) associated with the content and select “Report.” Follow the prompts to provide details about the issue and submit your report.'
    },
    {
      question: 'How do I recover my account if I forget my password?',
      answer: 'If you forget your password, go to the login page and click on “Forgot Password?” Follow the instructions to reset your password via the email or phone number associated with your account.'
    },
    {
      question: 'How can I block or mute someone?',
      answer: 'To block someone, visit their profile, click on the three dots (or menu icon), and select “Block.” To mute, you may need to find the option in the same menu and choose “Mute” or “Hide Posts.”'
    },
    {
      question: 'How do I view and manage my notifications?',
      answer: 'To view your notifications, go to the notifications tab on your account. You can manage notification preferences in your account settings to adjust what kind of alerts you receive and how they are delivered.'
    },
    {
      question: 'How can I use hashtags in my posts?',
      answer: 'To use hashtags, simply include the “#” symbol followed by the keyword or phrase in your post. Hashtags help categorize your content and make it discoverable by others interested in the same topics.'
    }
  ];

  return (
    <div className="faq">
      <h2>FAQ</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Faq;
