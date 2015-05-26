About this module
=================

После инсталляции модуля необходимо:
- Активировать модуль: `npctl module enable yandexmoney` или Управление -> Ядро -> Модули
- Активировать модуль и настроить авторизацию: Управление -> Внешние операторы -> Провайдеры -> Yandex.Money
- Настроить "секретное слово", выдаваемое сервисом Яндекс.Деньги, для верификации: Управление -> Ядро -> Настройки -> Общие настройки -> ym_sharedsecret
- Перезапустить vhost 'xop'


Деньги: https://tech.yandex.ru/money/doc/dg/reference/notification-p2p-incoming-docpage/
Касса/магазин: https://money.yandex.ru/doc.xml?id=526537
