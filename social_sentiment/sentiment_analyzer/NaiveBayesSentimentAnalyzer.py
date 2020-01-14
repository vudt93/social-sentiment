import os
import pickle
import nltk

pos_file = '../social_sentiment/rt-polaritydata/rt-polarity.pos'
neg_file = '../social_sentiment/rt-polaritydata/rt-polarity.neg'
classifier_file = '../social_sentiment/sentiment_analyzer/naive_bayes_classifier.pickle'

with open(os.path.abspath(pos_file), 'r') as f:
    pos_reviews = f.readlines()

with open(os.path.abspath(neg_file), 'r') as f:
    neg_reviews = f.readlines()

split_index = 2500

test_pos_review = pos_reviews[split_index + 1:]
test_neg_review = neg_reviews[split_index + 1:]

train_pos_review = pos_reviews[:split_index]
train_neg_review = neg_reviews[:split_index]


def get_vocabulary():
    pos_word_lst = [word for line in train_pos_review for word in line.split()]
    neg_word_lst = [word for line in train_neg_review for word in line.split()]
    return list(set(pos_word_lst + neg_word_lst))


vocabulary = get_vocabulary()


def get_train_data():
    pos_tagged_train_lst = [(review.split(), 1) for review in train_pos_review]
    neg_tagged_train_lst = [(review.split(), -1) for review in train_neg_review]
    return pos_tagged_train_lst + neg_tagged_train_lst


def extract_features(review):
    words = set(review)
    features = {}
    for w in vocabulary:
        features[w] = (w in words)
    return features


def trained_naive_bayes(training_data):
    training_features = nltk.classify.apply_features(extract_features, training_data)
    return nltk.NaiveBayesClassifier.train(training_features)


naive_bayes_classifier = None
try:
    f = open(os.path.abspath(classifier_file), 'rb')
    naive_bayes_classifier = pickle.load(f)
except Exception as e:
    print(e)

if naive_bayes_classifier is None:
    training_data = get_train_data()
    naive_bayes_classifier = trained_naive_bayes(training_data)
    f = open(os.path.abspath(classifier_file), 'wb')
    pickle.dump(naive_bayes_classifier, f)

f.close()

def calculate_sentiment(text):
    return naive_bayes_classifier.classify(extract_features(text.split()))


if __name__ == '__main__':
    print(calculate_sentiment("What an awesome movie"))
