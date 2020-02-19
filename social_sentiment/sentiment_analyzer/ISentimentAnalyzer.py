import abc


class ISentimentAnalyzer(metaclass=abc.ABCMeta):
    @abc.abstractmethod
    def calculate_sentiment(self, text):
        pass


