import os
import pickle
import nltk
from nltk.lm import vocabulary

from social_sentiment.sentiment_analyzer.ISentimentAnalyzer import ISentimentAnalyzer

pos_file = 'social_sentiment/rt-polaritydata/rt-polarity.pos'
neg_file = 'social_sentiment/rt-polaritydata/rt-polarity.neg'
classifier_file = 'social_sentiment/sentiment_analyzer/naive_bayes_classifier.pickle'


class NaiveBayesSentimentAnalyzer(ISentimentAnalyzer):
    naive_bayes_classifier = None
    vocabulary = None

    def __init__(self):
        with open(os.path.abspath(classifier_file), 'rb') as f:
            self.naive_bayes_classifier = pickle.load(f)

        with open(os.path.abspath(pos_file), 'r') as f, open(os.path.abspath(neg_file), 'r') as f1:
            split_index = 2500
            pos_reviews = f.readlines()
            train_pos_review = pos_reviews[:split_index]
            # test_pos_review = pos_reviews[split_index + 1:]

            neg_reviews = f1.readlines()
            train_neg_review = neg_reviews[:split_index]
            # test_neg_review = neg_reviews[split_index + 1:]

            self.vocabulary = self.get_vocabulary(train_pos_review, train_neg_review)

            if self.naive_bayes_classifier is None:
                training_data = self.get_train_data(train_pos_review, train_neg_review)
                self.naive_bayes_classifier = self.trained_naive_bayes(training_data)

                f = open(os.path.abspath(classifier_file), 'wb')
                pickle.dump(self.naive_bayes_classifier, f)

        f.close()

    def calculate_sentiment(self, text):
        return self.naive_bayes_classifier.classify(self.extract_features(text.split()))

    @staticmethod
    def get_vocabulary(train_pos_review, train_neg_review):
        pos_word_lst = [word for line in train_pos_review for word in line.split()]
        neg_word_lst = [word for line in train_neg_review for word in line.split()]
        return list(set(pos_word_lst + neg_word_lst))

    @staticmethod
    def get_train_data(train_pos_review, train_neg_review):
        pos_tagged_train_lst = [(review.split(), 1) for review in train_pos_review]
        neg_tagged_train_lst = [(review.split(), -1) for review in train_neg_review]
        return pos_tagged_train_lst + neg_tagged_train_lst

    def extract_features(self, review):
        words = set(review)
        features = {}
        for w in self.vocabulary:
            features[w] = (w in words)
        return features

    def trained_naive_bayes(self, training_data):
        training_features = nltk.classify.apply_features(self.extract_features, training_data)
        return nltk.NaiveBayesClassifier.train(training_features)


if __name__ == '__main__':
    analyzer = NaiveBayesSentimentAnalyzer()
    print(analyzer.calculate_sentiment("What an awesome movie"))
