from nltk.sentiment import vader
from nltk.corpus import sentiwordnet as swn

sia = vader.SentimentIntensityAnalyzer()


if __name__ == '__main__':
    print(sia.polarity_scores("Terrible Dog"))
    print(list(swn.senti_synsets('dog')))


def calculate_sentiment(text):
    return list(swn.senti_synsets('dog'))[0]['compose']